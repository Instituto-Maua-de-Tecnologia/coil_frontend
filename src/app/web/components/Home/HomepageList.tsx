import { useEffect, useState } from "react";
import Search from "../GenericComponents/Search.tsx";
import Modal from "../Modal/Modal.tsx";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import NoElementsFound from "@components/GenericComponents/NoElementsFound.tsx";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner.tsx";
import HomepageCard from "./HomepageCard.tsx";
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
        const cacheKey = `projects_${type}`;
        const cachedProjects = localStorage.getItem(cacheKey);
        if (cachedProjects) {
            return JSON.parse(cachedProjects) as IAllProjects[];
        } else {
            const projectValues = await getAllActivities({
                type_activity: type
            });
            localStorage.setItem(cacheKey, JSON.stringify(projectValues));
            return projectValues as IAllProjects[];
        }
    };

    const enrolledIdsToArray = (enrolledProjects: IAllProjects[]) => {
        return enrolledProjects.map((project) => `${project.id}`);
    };

    const [selectedProject, setSelectedProject] = useState<IAllProjects | null>(
        null
    );
    const [filteredProjects, setFilteredProjects] = useState<IAllProjects[]>(
        []
    );

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

            try {
                const coilProjects = await handleGetAllProjects("1");
                const mobilityProjects = await handleGetAllProjects("2");
                const allProjects = [...mobilityProjects, ...coilProjects];
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
                            <ul className="w-full max-h-screen pb-[3000rem] pe-5 custom-scrollbar overflow-y-auto">
                                {filteredProjects.map((project) => (
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
