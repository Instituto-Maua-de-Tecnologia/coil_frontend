import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "./Search";

interface Project {
    id: number;
    avatarUrl: string;
    title: string;
    partnerName: string;
    status: string;
}

const ProjectList: React.FC = () => {
    const projects: Project[] = [
        {
            id: 1,
            avatarUrl: "maua.png",
            title: "Project Manager",
            partnerName: "Maua",
            status: "Open"
        },
        {
            id: 2,
            avatarUrl: "fontys.png",
            title: "Klarity 2",
            partnerName: "Fontys",
            status: "Closed"
        }
    ];
    const [filteredProjects, setFilteredProjects] =
        useState<Project[]>(projects);

    const handleSearch = (searchTerm: string) => {
        const filtered = projects.filter(
            (project) =>
                project.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                project.partnerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    return (
        <div className="mx-auto">
            <div className="container mx-auto">
                {/* Search bar */}
                <div className="mb-4">
                    <Search onSearch={handleSearch} />
                </div>
                {filteredProjects.length > 0 ? (
                    <ul className="w-full">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </ul>
                ) : (
                    <p className="mx-auto my-5 text-center text-2xl">No project matched the search criteria</p>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
