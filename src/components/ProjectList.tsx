import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "./Search";
import Fontys from "@assets/fontys.jpg";
import Filter from "@components/Filter.tsx";

type Project = {
    id: number;
    avatarUrl: string;
    title: string;
    partnerName: string;
    status: string;
    languages: string[];
    country: string;
};

interface ProjectListProps {
    isFilter: boolean;
    isSearch: boolean;
}

export default function ProjectList({ isFilter, isSearch }: ProjectListProps) {
    const projects: Project[] = [
        {
            id: 1,
            avatarUrl: Fontys,
            title: "Project Manager",
            partnerName: "Maua",
            status: "Open",
            languages: ["be", "nl", "br"],
            country: "nl"
        },
        {
            id: 2,
            avatarUrl: Fontys,
            title: "Klarity 2",
            partnerName: "Fontys",
            status: "Closed",
            languages: ["be", "nl", "br"],
            country: "nl"
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
                    .includes(searchTerm.toLowerCase()) ||
                project.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    return (
        <div className="w-full px-7 py-4 bg-sb-bg rounded-3xl">
            <div className="mb-4 flex">
                {isSearch && <Search onSearch={handleSearch} />}
                {isFilter && <Filter />}
            </div>
            {filteredProjects.length > 0 ? (
                <ul className="w-full max-h-screen pe-5 overflow-y-auto">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </ul>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No project matched the search criteria
                </p>
            )}
        </div>
    );
}
