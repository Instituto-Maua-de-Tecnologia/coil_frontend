import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "./Search";
import { Project } from "../types";
import Modal from "./Modal";

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const [filteredProjects, setFilteredProjects] =
        useState<Project[]>(projects);
    const handleModalOpen = (project: Project) => {
        setSelectedProject(project);
    };

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

    return (
        <div className="w-11/12 mx-auto">
            <div className="mb-4">
                <Search onSearch={handleSearch} />
            </div>
            {filteredProjects.length > 0 ? (
                <div>
                    <ul className="w-full">
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
