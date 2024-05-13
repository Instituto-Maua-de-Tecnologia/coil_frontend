import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "../GenericComponents/Search";
// import Filter from "@components/GenericComponents/Filter";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import Add from "../GenericComponents/Add";
import { Project } from "types";
import { MoonLoader } from "react-spinners";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";

type ProjectProps = {
    activity_status: {
        id: number;
        name: string;
    };
    activity_type: {
        id: number;
        name: string;
    };
    courses: [
        {
            course: {
                name: string;
            };
            course_id: number;
        }
    ];
    created_at: string;
    end_date: string;
    id: string;
    languages: [
        {
            language: string;
        }
    ];
    partner_institutions: [
        {
            institution: {
                country: string;
                id: string;
                images: [
                    {
                        image: string;
                    }
                ];
                name: string;
            };
            institution_id: string;
        }
    ];
    start_date: string;
    title: string;
    updated_at: string;
};

interface ProjectListProps {
    isAdmin: boolean;
}

export default function ProjectList({ isAdmin }: ProjectListProps) {
    const [projects, setProjects] = useState<ProjectProps[]>([
        {
            activity_status: {
                id: 0,
                name: ""
            },
            activity_type: {
                id: 0,
                name: ""
            },
            courses: [
                {
                    course: {
                        name: ""
                    },
                    course_id: 0
                }
            ],
            created_at: "",
            end_date: "",
            id: "",
            languages: [
                {
                    language: ""
                }
            ],
            partner_institutions: [
                {
                    institution: {
                        country: "",
                        id: "",
                        images: [
                            {
                                image: ""
                            }
                        ],
                        name: ""
                    },
                    institution_id: ""
                }
            ],
            start_date: "",
            title: "",
            updated_at: ""
        }
    ]);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleGetAllProjects = async () => {
        try {
            const projectValues = (await getAllActivities({
                type_activity: "1"
            })) as ProjectProps[];
            setProjects(projectValues);
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        } finally {
            setLoaded(true);
        }
    };

    const enrolledIdsToArray = (enrolledProjects: ProjectProps[]) => {
        return enrolledProjects.map((project) => {
            return `${project.id}`;
        });
    };

    const handleGetEnrolledProjects = async () => {
        await getAllActivitiesEnrolled({ type_activity: "1" })
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
        console.log(enrolledProjectsIds);
        return enrolledProjectsIds.includes(id);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = projects.filter(
            (project) =>
                project.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.partner_institutions[0].institution.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.activity_status.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    const isDarkTheme = useThemeDetector();

    /* eslint-disable */

    useEffect(() => {
        const handleGets = async () => {
            await handleGetEnrolledProjects();
            await handleGetAllProjects();
        };
        handleGets();
    }, []);

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
                    {isAdmin ? <Add url="/CreateProject" /> : null}
                    {/* {isFilter && <Filter />} */}
                </div>
            </div>
            {filteredProjects.length > 0 ? (
                <div>
                    {loaded ? (
                        <ul className="w-full max-h-screen pe-5 custom-scrollbar overflow-y-auto">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    enrolled={handleVerifyEnrollment(
                                        project.id
                                    )}
                                    onClick={handleModalOpen}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-center items-center mt-[25vh]">
                            <MoonLoader
                                color={`${isDarkTheme ? "#fff" : "#000"}`}
                                size={35}
                            />
                        </div>
                    )}
                    {selectedProject ? (
                        <Modal
                            project={selectedProject}
                            enrolled={
                                enrolledProjectsIds.includes(selectedProject.id)
                                    ? true
                                    : false
                            }
                            isOpen={true}
                            onClose={handleModalClose}
                        />
                    ) : null}
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No project matched the search criteria
                </p>
            )}
        </div>
    );
}
