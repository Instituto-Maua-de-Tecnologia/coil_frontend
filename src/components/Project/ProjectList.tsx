import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "../GenericComponents/Search";
import Modal from "../Modal/Modal";
import Add from "../GenericComponents/Add";
import { MoonLoader } from "react-spinners";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";
import { Project } from "types";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface ProjectListProps {
    isAdmin: boolean;
    type?: number;
    showBadges?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({
    isAdmin,
    type,
    showBadges = true
}) => {
    const isDarkTheme = useThemeDetector();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mobilityProjects = await handleGetAllProjects("1");
                const regularProjects = await handleGetAllProjects("2");
                const allProjects = [...mobilityProjects, ...regularProjects];

                const uniqueProjects = Array.from(
                    new Set(allProjects.map((project) => project.id))
                )
                    .map((id) =>
                        allProjects.find((project) => project.id === id)
                    )
                    .filter((project) => project) as Project[];

                setProjects(uniqueProjects);
                setFilteredProjects(
                    uniqueProjects.filter((project) =>
                        type ? project.activity_type.id === type : true
                    )
                );
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoaded(true);
            }
        };

        fetchData();
    }, [type]);

    const handleGetAllProjects = async (type: string): Promise<Project[]> => {
        const projectValues = await getAllActivities({ type_activity: type });
        return projectValues as Project[];
    };

    const handleGetEnrolledProjects = async () => {
        try {
            const response = await getAllActivitiesEnrolled({
                type_activity: "1"
            });
            if (Array.isArray(response)) {
                const enrolledIds = response.map((project) => `${project.id}`);
                setEnrolledProjectsIds(enrolledIds);
            } else {
                console.error("Invalid response format for enrolled projects.");
            }
        } catch (error) {
            console.error("Error fetching enrolled projects:", error);
        }
    };

    useEffect(() => {
        if (!isAdmin) {
            handleGetEnrolledProjects();
        }
    }, []);

    const handleVerifyEnrollment = (id: string) => {
        return enrolledProjectsIds.includes(id);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = projects.filter((project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    const handleModalOpen = (project: Project) => {
        setSelectedProject(project);
    };

    const handleModalClose = () => {
        setSelectedProject(null);
    };

    return (
        <div
            className={`w-full lg:ml-4 p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search disabled={!loaded} onSearch={handleSearch} />
                <div className="button-container flex absolute right-12">
                    {isAdmin && <Add url="/CreateProject" />}
                </div>
            </div>
            {filteredProjects.length > 0 ? (
                <div>
                    {loaded ? (
                        <ul className="w-full max-h-screen pe-5 custom-scrollbar overflow-y-auto">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    enrolled={handleVerifyEnrollment(
                                        project.id
                                    )}
                                    onClick={handleModalOpen}
                                    showBadge={showBadges}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-center items-center mt-[25vh]">
                            <MoonLoader
                                color={isDarkTheme ? "#fff" : "#000"}
                                size={35}
                            />
                        </div>
                    )}
                    {selectedProject && (
                        <Modal
                            project={selectedProject}
                            enrolled={enrolledProjectsIds.includes(
                                selectedProject.id
                            )}
                            isOpen={true}
                            onClose={handleModalClose}
                        />
                    )}
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No project matched the search criteria
                </p>
            )}
        </div>
    );
};

export default ProjectList;
