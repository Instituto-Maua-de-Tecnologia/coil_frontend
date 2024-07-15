import { useEffect, useState } from "react";
import Search from "../GenericComponents/Search";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import IProject from "@interfaces/project/IProject";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import HomepageCard from "./HomepageCard";

export default function HomepageList() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleGetAllProjects = async (type: string): Promise<IProject[]> => {
        const projectValues = await getAllActivities({ type_activity: type });
        return projectValues as IProject[];
    };

    const enrolledIdsToArray = (enrolledProjects: IProject[]) => {
        return enrolledProjects.map((project) => {
            return `${project.id}`;
        });
    };

    const handleGetEnrolledProjects = async () => {
        await getAllActivitiesEnrolled({ type_activity: 1 })
            .then((response) => {
                setEnrolledProjectsIds(
                    enrolledIdsToArray(response as IProject[])
                );
            })
            .catch((error) => {
                console.error("Erro ao obter projetos:", error);
            });
    };

    const [selectedProject, setSelectedProject] = useState<IProject | null>(
        null
    );
    const [filteredProjects, setFilteredProjects] =
        useState<IProject[]>(projects);

    const handleModalOpen = (project: IProject) => {
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
    };

    const isDarkTheme = useThemeDetector();

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

    return (
        <div
            className={`w-full lg:ml-4 p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search disabled={!loaded} onSearch={handleSearch} />
            </div>
            {projects.length > 0 ? (
                filteredProjects.length > 0 ? (
                    <div>
                        {loaded ? (
                            <ul className="w-full max-h-screen pe-5 pb-10 lg:!pb-[400px] custom-scrollbar overflow-y-auto">
                                {projects.map((project) => (
                                    <HomepageCard
                                        key={"ProjectCardKey " + project.id}
                                        project={project}
                                        enrolled={handleVerifyEnrollment(
                                            project.id
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
                                    selectedProject.id
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
