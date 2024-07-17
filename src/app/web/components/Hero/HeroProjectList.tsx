import { useEffect, useState } from "react";
import "@styles/scrollbar.css";

import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";

import getAllActivitiesCatalog from "@integrations/activity/get_all_activities_catalog.ts";
import HeroProjectCard from "./HeroProjectCard";
import IProjectCatalog from "@interfaces/project/IProjectCatalog.ts";

interface HeroProjectListProps {
    isProject: boolean;
}

export default function ProjectListHero({ isProject }: HeroProjectListProps) {
    const [projects, setProjects] = useState<IProjectCatalog>({
        projects: [
            {
                title: "",
                logo: "",
                type_activity: 0
            }
        ],
        mobilities: [
            {
                title: "",
                logo: "",
                type_activity: 0
            }
        ]
    });
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleGetAllProjectsCatalog = async () => {
        try {
            const projectValues =
                (await getAllActivitiesCatalog()) as IProjectCatalog;
            setProjects(projectValues);
        } catch (error) {
            console.error("Erro ao obter projetos:", error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        const handleGets = async () => {
            await handleGetAllProjectsCatalog();
        };
        void handleGets();
    }, []);

    return (
        <div className={`w-full  p-4 bg-[#FFFFFF] rounded-3xl`}>
            {projects !== undefined ? (
                <div>
                    {loaded ? (
                        <ul className="w-full custom-scrollbar overflow-y-auto">
                            {isProject
                                ? projects.projects.map((project, index) => (
                                      <HeroProjectCard
                                          key={"COILCardKey " + index}
                                          project={project}
                                          onClick={function (): void {
                                              throw new Error(
                                                  "Function not implemented."
                                              );
                                          }}
                                      />
                                  ))
                                : projects.mobilities.map((project, index) => (
                                      <HeroProjectCard
                                          key={"MobilityCardKey " + index}
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
