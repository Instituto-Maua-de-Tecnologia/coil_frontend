import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "../GenericComponents/Search";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import { Paginator } from "primereact/paginator";

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

export default function ProjectList() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(3);
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);
    const [filteredProjects, setFilteredProjects] = useState<ProjectProps[]>(
        []
    );
    const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
        null
    );

    const handleGetAllProjects = async () => {
        try {
            const projectValues = (await getAllActivities({
                type_activity: "1"
            })) as ProjectProps[];
            setProjects(projectValues);
            setFilteredProjects(projectValues); // Initialize filteredProjects
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        } finally {
            setLoaded(true);
        }
    };

    const enrolledIdsToArray = (enrolledProjects: ProjectProps[]) => {
        return enrolledProjects.map((project) => `${project.id}`);
    };

    const handleGetEnrolledProjects = async () => {
        try {
            const response = await getAllActivitiesEnrolled({
                type_activity: 1
            });
            setEnrolledProjectsIds(
                enrolledIdsToArray(response as ProjectProps[])
            );
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        }
    };

    const handleModalOpen = (project: ProjectProps) => {
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
        setFirst(0); // Reset to first page on search
    };

    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        const handleGets = async () => {
            await handleGetEnrolledProjects();
            await handleGetAllProjects();
        };
        handleGets();
    }, []);

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const currentItems = filteredProjects.slice(first, first + rows);

    return (
        <div
            className={`w-full lg:ml-4 p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex justify-between">
                <Search onSearch={handleSearch} disabled={false} />
                <Paginator
                    className={`h-14 mr-[26px] ${isDarkTheme ? "bg-[#14222E] text-white" : "bg-[#FFFFFF]"}`}
                    first={first}
                    rows={rows}
                    totalRecords={filteredProjects.length}
                    onPageChange={onPageChange}
                />
                <div className="button-container flex absolute right-12">
                    {/* {isAdmin ? <Add url="/CreateCOIL" /> : null} */}
                    {/* {isFilter && <Filter />} */}
                </div>
            </div>
            {loaded ? (
                projects.length > 0 ? (
                    filteredProjects.length > 0 ? (
                        <div>
                            <ul className="w-full max-h-screen pe-5 pb-48 custom-scrollbar overflow-y-auto">
                                {currentItems.map((project) => (
                                    <ProjectCard
                                        key={"COILCardKey " + project.id}
                                        project={project}
                                        enrolled={handleVerifyEnrollment(
                                            project.id as string
                                        )}
                                        onClick={() => handleModalOpen(project)}
                                    />
                                ))}
                            </ul>
                            {selectedProject ? (
                                <Modal
                                    enrolled={enrolledProjectsIds.includes(
                                        selectedProject.id as string
                                    )}
                                    project={selectedProject}
                                    isOpen={true}
                                    onClose={handleModalClose}
                                />
                            ) : null}
                        </div>
                    ) : (
                        <NoElementsFound message="No opportunities were found" />
                    )
                ) : (
                    <NoElementsFound message="No opportunities were found" />
                )
            ) : (
                <div className="flex mt-[15%] fill-slate-500 justify-center items-center">
                    <LoadSpinner />
                </div>
            )}
        </div>
    );
}
