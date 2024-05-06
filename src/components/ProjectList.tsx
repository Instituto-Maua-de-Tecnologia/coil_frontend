import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "./Search";
import Filter from "@components/Filter.tsx";
import { Project } from "../types";
import Modal from "./Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import Maua from "@assets/maua.png";
import Fontys from "@assets/fontys.jpg";

interface ProjectListProps {
    isFilter: boolean;
}
export default function ProjectList({ isFilter }: ProjectListProps) {
    const projects = [
        {
            id: 1,
            avatarUrl: Maua,
            title: "Project Manager",
            partnerName: "Mauá",
            status: "Open",
            languages: ["be", "nl", "br"],
            country: "br"
        },
        {
            id: 2,
            avatarUrl: Fontys,
            title: "Collaborative Online International...",
            partnerName: "Fontys",
            status: "Closed",
            languages: ["be", "nl", "br"],
            country: "nl"
        }
    ];
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
    const isDarkTheme = useThemeDetector();

    /* eslint-disable */

    useEffect(() => {
        let project = localStorage.getItem("project");
        if (project) {
            handleGetAllActivities()
                .then()
                .catch((error) => {
                    throw new Error(
                        "Não foi possível buscar projetos " + error
                    );
                });
        }
    }, [localStorage.getItem("project")]);

    async function handleGetAllActivities() {
        let project = await getAllActivities({ type_activity: "1" });
        console.log(project);
        localStorage.setItem("project", JSON.stringify(project));
    }

    handleGetAllActivities();
    /* eslint-enable */
    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
                {isFilter && <Filter />}
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
