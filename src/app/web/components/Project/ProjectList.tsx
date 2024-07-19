import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "../GenericComponents/Search";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import IAllProjects from "@interfaces/project/IAllProjects.ts";

export default function ProjectList() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(3);
    const [projects, setProjects] = useState<IAllProjects[]>([]);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const isCOIL = window.location.pathname.replace("/", "") === "COIL";
    const [loaded, setLoaded] = useState<boolean>(false);
    const [filteredProjects, setFilteredProjects] = useState<IAllProjects[]>(
        []
    );
    const [selectedProject, setSelectedProject] = useState<IAllProjects | null>(
        null
    );

    const handleGetAllProjects = async () => {
        try {
            const projectValues = (await getAllActivities({
                type_activity: isCOIL ? "1" : "2"
            })) as IAllProjects[];
            setProjects(projectValues);
            setFilteredProjects(projectValues); // Initialize filteredProjects
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        setProjects([]);
        setLoaded(false);
        void handleGetAllProjects();
    }, [isCOIL]);

    const enrolledIdsToArray = (enrolledProjects: IAllProjects[]) => {
        return enrolledProjects.map((project) => `${project.id}`);
    };

    const handleModalOpen = (project: IAllProjects) => {
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
                project.activity_status.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
        setFirst(0); // Reset to first page on search
    };

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isSmallVersion = screenWidth <= 767;

    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        const handleGetEnrolledProjects = async () => {
            try {
                const response = await getAllActivitiesEnrolled({
                    type_activity: 1
                });
                setEnrolledProjectsIds(
                    enrolledIdsToArray(response as IAllProjects[])
                );
            } catch (error) {
                console.error("Erro ao obter projetos:", error);
            }
        };
        const handleGets = async () => {
            await handleGetEnrolledProjects();
            await handleGetAllProjects();
        };
        void handleGets();
    }, []);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const currentItems = filteredProjects.slice(first, first + rows);

    return (
        <div
            className={`w-full p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex justify-between">
                <Search onSearch={handleSearch} disabled={false} />
                {!isSmallVersion && (
                    <Paginator
                        className={`h-14 mr-[26px] ${isDarkTheme ? "bg-[#14222E] text-white" : "bg-[#FFFFFF]"}`}
                        first={first}
                        rows={rows}
                        totalRecords={filteredProjects.length}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
            {isSmallVersion && (
                <Paginator
                    className={`${isDarkTheme ? "bg-[#14222E] text-white" : "bg-[#FFFFFF]"}`}
                    first={first}
                    rows={rows}
                    totalRecords={filteredProjects.length}
                    onPageChange={onPageChange}
                    template={{
                        layout: "PrevPageLink CurrentPageReport NextPageLink"
                    }}
                />
            )}
            {loaded ? (
                projects.length > 0 ? (
                    filteredProjects.length > 0 ? (
                        <div>
                            <ul className="w-full max-h-screen pe-5 pb-96 custom-scrollbar overflow-y-auto">
                                {currentItems.map((project) => (
                                    <ProjectCard
                                        key={"ProjectCardKey " + project.id}
                                        project={project}
                                        enrolled={handleVerifyEnrollment(
                                            project.id
                                        )}
                                        onClick={() => handleModalOpen(project)}
                                    />
                                ))}
                            </ul>
                            {selectedProject ? (
                                <Modal
                                    enrolled={enrolledProjectsIds.includes(
                                        selectedProject.id
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
