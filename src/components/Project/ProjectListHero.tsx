import { useEffect, useState } from "react";
// import Filter from "@components/GenericComponents/Filter";
import "@style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import ProjectCardHero from "./ProjectCardHero";
// import { UserTypeEnum } from "@enum/UserTypeEnum";

type ProjectProps = {
    id?: string;
    title?: string;
    activity_type?: {
        id: number;
        name: string;
    };
};

export default function ProjectListHero() {
    const [projects, setProjects] = useState<ProjectProps[]>([
        {
            id: "",
            title: "",
            activity_type: {
                id: 0,
                name: ""
            }
        }
    ]);
    const [loaded, setLoaded] = useState<boolean>(false);

    // const user_type = JSON.parse(
    //     localStorage.getItem("user") as string
    // ).user_type;

    const handleGetAllProjects = async () => {
        try {
            const projectValues = (await getAllActivities({
                type_activity: "1"
            })) as ProjectProps[];
            setProjects(projectValues);
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        } finally {
            setLoaded(true);
        }
    };

    /* eslint-disable */

    useEffect(() => {
        const handleGets = async () => {
            await handleGetAllProjects();
        };
        handleGets();
    }, []);

    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (enrolledProjectsIds.length > 0) {
    //         console.log(enrolledProjectsIds);
    //     }
    // }, [enrolledProjectsIds])

    /* eslint-enable */
    return (
        <div className={`w-full lg:ml-4 p-4 bg-[#FFFFFF] rounded-3xl`}>
            {projects.length > 0 ? (
                <div>
                    {loaded ? (
                        <ul className="w-full  pe-5 pb-48 custom-scrollbar overflow-y-auto">
                            {projects.map((project) => (
                                <ProjectCardHero
                                    key={"COILCardKey " + project.id}
                                    project={project}
                                    onClick={function (): void {
                                        throw new Error(
                                            "Function not implemented."
                                        );
                                    }}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex mt-[15%] fill-slate-500 justify-center items-center">
                            <LoadSpinner />
                        </div>
                    )}
                </div>
            ) : (
                <NoElementsFound message="No projects were found" />
            )}
        </div>
    );
}
