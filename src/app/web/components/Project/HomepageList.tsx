import { useEffect, useState } from "react";
import Search from "../GenericComponents/Search";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import HomepageCard from "./HomepageCard";
import IAllProjects from "@interfaces/project/IAllProjects.ts";

export default function HomepageList() {
    const [projects, setProjects] = useState<IAllProjects[]>([]);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleGetAllProjects = async (
        type: string
    ): Promise<IAllProjects[]> => {
        const projectValues = await getAllActivities({ type_activity: type });
        return projectValues as IAllProjects[];
    };

    const enrolledIdsToArray = (enrolledProjects: IAllProjects[]) => {
        return enrolledProjects.map((project) => {
            return `${project.id}`;
        });
    };

    const [selectedProject, setSelectedProject] = useState<IAllProjects | null>(
        null
    );
    const [filteredProjects, setFilteredProjects] =
        useState<IAllProjects[]>(projects);

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
    };

    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        const fetchData = async () => {
            const handleGetEnrolledProjects = async () => {
                await getAllActivitiesEnrolled({ type_activity: 1 })
                    .then((response) => {
                        setEnrolledProjectsIds(
                            enrolledIdsToArray(response as IAllProjects[])
                        );
                    })
                    .catch((error) => {
                        console.error("Erro ao obter projetos:", error);
                    });
            };
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

        void fetchData();
    }, []);

    return (
        <div
            className={`w-full lg:ml-4 p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search disabled={!loaded} onSearch={handleSearch} />
            </div>
            {loaded ? (
                projects.length > 0 ? (
                    <div>
                        {filteredProjects.length > 0 ? (
                            <ul className="w-full max-h-screen pe-5 pb-[450px] custom-scrollbar overflow-y-auto">
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
                            <p className="mx-auto my-5 text-center text-2xl">
                                <NoElementsFound message="No opportunities matched the search criteria" />
                            </p>
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
