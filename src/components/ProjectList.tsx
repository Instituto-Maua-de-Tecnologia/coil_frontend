import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList: React.FC = () => {
    interface Project {
        id: number;
        avatarUrl: string;
        title: string;
        partnerName: string;
        status: string;
    }

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

    return (
        <ul className="w-[680px]">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </ul>
    );
};

export default ProjectList;
