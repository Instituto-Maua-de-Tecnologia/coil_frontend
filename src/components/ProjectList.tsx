import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "./Search";
import Filter from "@components/Filter.tsx";
import { Project } from "../types";
import Modal from "./Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";
import Add from "./Add";

interface ProjectListProps {
    projects: Project[];
    isFilter: boolean;
    isAdmin: boolean;
}
export default function ProjectList({
    projects,
    isFilter,
    isAdmin
}: ProjectListProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const [filteredProjects, setFilteredProjects] =
        useState<Project[]>(projects);
    const handleModalOpen = (project: Project) => {
        setSelectedProject(project);
    };
    console.log(localStorage.getItem("token") as string);

    const handleModalClose = () => {
        setSelectedProject(null);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = projects.filter(
            (project) =>
                project.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.partnerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
                <div className="button-container flex absolute right-12">
                    {isAdmin ? <Add url="/CreateProject" /> : null}
                    {isFilter && <Filter />}
                </div>
            </div>
            {filteredProjects.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={handleModalOpen}
                            />
                        ))}
                    </ul>
                    {selectedProject && (
                        <Modal
                            project={selectedProject}
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
}
