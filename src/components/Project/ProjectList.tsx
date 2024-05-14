import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Search from "../GenericComponents/Search";
//import Filter from "@components/GenericComponents/Filter";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import Add from "../GenericComponents/Add";
import { Project } from "types";
import { MoonLoader } from "react-spinners";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled";

// type ProjectProps = {
//     activity_status: {
//         id: number;
//         name: string;
//     };
//     activity_type: {
//         id: number;
//         name: string;
//     };
//     courses: [
//         {
//             course: {
//                 name: string;
//             };
//             course_id: number;
//         }
//     ];
//     created_at: string;
//     end_date: string;
//     id: string;
//     languages: [
//         {
//             language: string;
//         }
//     ];
//     partner_institutions: [
//         {
//             institution: {
//                 country: string;
//                 id: string;
//                 images: [
//                     {
//                         image: string;
//                     }
//                 ];
//                 name: string;
//             };
//             institution_id: string;
//         }
//     ];
//     start_date: string;
//     title: string;
//     updated_at: string;
// };

interface ProjectListProps {
    isAdmin: boolean;
}

export default function ProjectList({ isAdmin }: ProjectListProps) {
    console.log(isAdmin);
    const isDarkTheme = useThemeDetector();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] =
        useState<Project[]>(projects);
    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleGetAllProjects = async (type: string) => {
        try {
            const projectValues = await getAllActivities({
                type_activity: type
            });
            return projectValues as Project[];
        } catch (error) {
            console.error("Error fetching projects:", error);
            return [];
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        const handleGets = async () => {
            const mobilityProjects = await handleGetAllProjects("1");
            const regularProjects = await handleGetAllProjects("2");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const enrolledProjects = await handleGetEnrolledProjects();
            const allProjects = [...mobilityProjects, ...regularProjects];

            const uniqueProjects = Array.from(
                new Set(allProjects.map((project) => project.id))
            )
                .map((id) => {
                    return allProjects.find((project) => project.id === id);
                })
                .filter((project) => project !== undefined) as Project[];
            setProjects(uniqueProjects);
        };
        handleGets();
    }, []);

    console.table(filteredProjects);

    const enrolledIdsToArray = (enrolledProjects: Project[]) => {
        return enrolledProjects.map((project) => {
            return `${project.id}`;
        });
    };

    const handleGetEnrolledProjects = async () => {
        await getAllActivitiesEnrolled({ type_activity: "1" })
            .then((response) => {
                setEnrolledProjectsIds(
                    enrolledIdsToArray(response as Project[])
                );
            })
            .catch((error) => {
                console.error("Erro ao obter projetos:", error);
            });
    };

    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const handleModalOpen = (project: Project) => {
        setSelectedProject(project);
    };

    const handleModalClose = () => {
        setSelectedProject(null);
    };

    const handleVerifyEnrollment = (id: string) => {
        return enrolledProjectsIds.includes(id);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = projects.filter((project) =>
            project.title
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
        );
        setFilteredProjects(filtered);
    };

    return (
        <div
            className={`w-full lg:ml-4 p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search disabled={!loaded} onSearch={handleSearch} />
                <div className="button-container flex absolute right-12">
                    {isAdmin ? <Add url="/CreateProject" /> : null}
                    {/* {isFilter && <Filter />} */}
                </div>
            </div>
            {filteredProjects.length > 0 ? (
                <div>
                    {loaded ? (
                        <ul className="w-full max-h-screen pe-5 custom-scrollbar overflow-y-auto">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    enrolled={handleVerifyEnrollment(
                                        project.id
                                    )}
                                    onClick={handleModalOpen}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-center items-center mt-[25vh]">
                            <MoonLoader
                                color={`${isDarkTheme ? "#fff" : "#000"}`}
                                size={35}
                            />
                        </div>
                    )}
                    {selectedProject ? (
                        <Modal
                            project={selectedProject}
                            enrolled={
                                enrolledProjectsIds.includes(selectedProject.id)
                                    ? true
                                    : false
                            }
                            isOpen={true}
                            onClose={handleModalClose}
                        />
                    ) : null}
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No project matched the search criteria
                </p>
            )}
        </div>
    );
}
