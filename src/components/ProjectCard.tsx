import React from "react";

interface Project {
    id: number;
    avatarUrl: string;
    title: string;
    partnerName: string;
    status: string;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { avatarUrl, title, partnerName, status } = project;

    return (
        <li className="flex items-center border border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm">{partnerName}</p>
                    <span
                        className={`text-sm font-bold ${status === "Open" ? "text-green-500" : "text-red-500"}`}
                    >
                        {status}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default ProjectCard;
