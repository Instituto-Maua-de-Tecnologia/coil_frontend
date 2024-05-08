import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "../GenericComponents/Search";
import Filter from "@components/GenericComponents/Filter";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import Add from "../GenericComponents/Add";
import { Project } from "types";

type ProjectProps = [
    {
        id: number;
        avatarUrl: string;
        title: string;
        partnerName: string;
        status: string;
        languages: string[];
        country: string;
    }
];

interface ProjectListProps {
    isFilter: boolean;
    isAdmin: boolean;
}
export default function ProjectList({ isFilter, isAdmin }: ProjectListProps) {
    const [projects, setProjects] = useState<ProjectProps>([
        {
            id: 0,
            avatarUrl: "",
            title: "",
            partnerName: "",
            status: "",
            languages: [""],
            country: ""
        }
    ]);

    const handleGetAllProjects = async () => {
        try {
            const projectValues = (await getAllActivities({
                type_activity: "1"
            })) as ProjectProps;
            setProjects(projectValues);
            console.log(projects);
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        }
    };

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
            handleGetAllProjects()
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
