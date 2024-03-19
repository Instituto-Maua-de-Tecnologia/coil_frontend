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
        <li className="flex items-center border border-gray-300 rounded-lg p-4 mb-4 w-full">
            <div className="flex flex-col flex-grow w-full">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 flex items-center">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full mr-4 bg-contain"
                        />
                    </div>
                    <div className="col-span-1 flex items-center text-lg font-semibold">
                        {title}
                    </div>
                    <div className="col-span-1 flex items-center text-sm">
                        {partnerName}
                    </div>
                    <div
                        className={`col-span-1 flex items-center text-sm font-bold ${status === "Open" ? "text-green-500" : "text-red-500"}`}
                    >
                        {status}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ProjectCard;
