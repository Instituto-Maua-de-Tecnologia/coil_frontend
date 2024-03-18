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
            avatarUrl: "https://example.com/avatar1.png",
            title: "Project 1",
            partnerName: "Partner A",
            status: "Open"
        },
        {
            id: 2,
            avatarUrl: "https://example.com/avatar2.png",
            title: "Project 2",
            partnerName: "Partner B",
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
        <>
            <Search onSearch={handleSearch} />
            <div className="min-h-[600px]">
                <ul className="w-[680px]">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ProjectList;
