import { useEffect, useState } from "react";
import Search from "../GenericComponents/Search";
// import Filter from "@components/GenericComponents/Filter";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import { Project } from "types";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import HomepageCard from "./HomepageCard";
// import { UserTypeEnum } from "@enum/UserTypeEnum";

type ProjectProps = {
    id?: string;
    title?: string;
    start_date?: string;
    end_date?: string;
    created_at?: string;
    updated_at?: string;
    courses?: [
        {
            course_id: number;
            course: {
                id: number;
                course: string;
            };
        }
    ];
    languages?: [
        {
            language_id: number;
            language: {
                id: number;
                language: string;
                language_code: string;
            };
        }
    ];
    criterias?: {
        criteria_id: number;
        criteria: [
            {
                id: number;
                criteria: string;
            }
        ];
    };
    partner_institutions?: [
        {
            institution_id?: string;
            institution?: {
                id: string;
                name: string;
                description: string;
                email: string;
                social_medias: [
                    {
                        id?: number;
                        institution_id?: string;
                        social_media_id?: number;
                        link?: string;
                        media?: {
                            id: number;
                            name: string;
                        };
                    }
                ];
                countries: [
                    {
                        id?: number;
                        institution_id?: string;
                        country_id?: number;
                        country?: {
                            id: number;
                            country: string;
                            country_code: string;
                        };
                    }
                ];
                images: [
                    {
                        image?: string;
                    }
                ];
            };
        }
    ];
    activity_status?: {
        id: number;
        name: string;
    };
    activity_type?: {
        id: number;
        name: string;
    };
};

export default function HomepageList() {
    const [projects, setProjects] = useState<ProjectProps[]>([
        {
            id: "",
            title: "",
            start_date: "",
            end_date: "",
            created_at: "",
            updated_at: "",
            courses: [
                {
                    course_id: 0,
                    course: {
                        id: 0,
                        course: ""
                    }
                }
            ],
            languages: [
                {
                    language_id: 0,
                    language: {
                        id: 0,
                        language: "",
                        language_code: ""
                    }
                }
            ],
            criterias: {
                criteria_id: 0,
                criteria: [
                    {
                        id: 0,
                        criteria: ""
                    }
                ]
            },
            partner_institutions: [
                {
                    institution_id: "",
                    institution: {
                        id: "",
                        name: "",
                        description: "",
                        email: "",
                        social_medias: [
                            {
                                id: 0,
                                institution_id: "",
                                social_media_id: 0,
                                link: "",
                                media: {
                                    id: 0,
                                    name: ""
                                }
                            }
                        ],
                        countries: [
                            {
                                id: 0,
                                institution_id: "",
                                country_id: 0,
                                country: {
                                    id: 0,
                                    country: "",
                                    country_code: ""
                                }
                            }
                        ],
                        images: [
                            {
                                image: ""
                            }
                        ]
                    }
                }
            ],
            activity_status: {
                id: 0,
                name: ""
            },
            activity_type: {
                id: 0,
                name: ""
            }
        }
    ]);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);

    // const user_type = JSON.parse(
    //     localStorage.getItem("user") as string
    // ).user_type;

    const handleGetAllProjects = async (type: string): Promise<Project[]> => {
        const projectValues = await getAllActivities({ type_activity: type });
        return projectValues as Project[];
    };

    const enrolledIdsToArray = (enrolledProjects: ProjectProps[]) => {
        return enrolledProjects.map((project) => {
            return `${project.id}`;
        });
    };

    const handleGetEnrolledProjects = async () => {
        await getAllActivitiesEnrolled({ type_activity: 1 })
            .then((response) => {
                setEnrolledProjectsIds(
                    enrolledIdsToArray(response as ProjectProps[])
                );
            })
            .catch((error) => {
                console.error("Erro ao obter projetos:", error);
            });
    };

    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const [filteredProjects, setFilteredProjects] =
        useState<ProjectProps[]>(projects);

    const handleModalOpen = (project: Project) => {
        setSelectedProject(project);
    };

    const handleModalClose = () => {
        setSelectedProject(null);
    };

    const handleVerifyEnrollment = (id: string) => {
        return enrolledProjectsIds.includes(id);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = projects.filter(
            (project) =>
                project.title
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.partner_institutions?.[0]?.institution?.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.activity_status?.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    const isDarkTheme = useThemeDetector();

    /* eslint-disable */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mobilityProjects = await handleGetAllProjects("1");
                const regularProjects = await handleGetAllProjects("2");
                const allProjects = [...mobilityProjects, ...regularProjects];
                await handleGetEnrolledProjects();

                setProjects(allProjects);
                setFilteredProjects(allProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoaded(true);
            }
        };

        fetchData();
    }, []);

    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (enrolledProjectsIds.length > 0) {
    //         console.log(enrolledProjectsIds);
    //     }
    // }, [enrolledProjectsIds])

    /* eslint-enable */
    return (
        <div
            className={`w-full lg:ml-4 p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search disabled={!loaded} onSearch={handleSearch} />
                <div className="button-container flex absolute right-12">
                    {/* {isAdmin ? <Add url="/CreateProject" /> : null} */}
                    {/* {isFilter && <Filter />} */}
                </div>
            </div>
            {projects.length > 0 ? (
                filteredProjects.length > 0 ? (
                    <div>
                        {loaded ? (
                            <ul className="w-full max-h-screen pe-5 pb-48 custom-scrollbar overflow-y-auto">
                                {projects.map((project) => (
                                    <HomepageCard
                                        key={"ProjectCardKey " + project.id}
                                        project={project}
                                        enrolled={handleVerifyEnrollment(
                                            project.id as string
                                        )}
                                        onClick={handleModalOpen}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <div className="flex mt-[15%] fill-slate-500 justify-center items-center">
                                <LoadSpinner />
                            </div>
                        )}
                        {selectedProject ? (
                            <Modal
                                project={selectedProject}
                                enrolled={enrolledProjectsIds.includes(
                                    selectedProject.id as string
                                )}
                                isOpen={true}
                                onClose={handleModalClose}
                            />
                        ) : null}
                    </div>
                ) : projects.length > 0 ? (
                    <NoElementsFound message="No projects were found" />
                ) : (
                    <p className="mx-auto my-5 text-center text-2xl">
                        <NoElementsFound message="No opportunities matched the search criteria" />
                    </p>
                )
            ) : (
                <NoElementsFound message="No opportunities were found" />
            )}
        </div>
    );
}
