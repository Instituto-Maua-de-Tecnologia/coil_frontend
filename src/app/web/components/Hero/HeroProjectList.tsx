import "@styles/scrollbar.css";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import HeroProjectCard from "./HeroProjectCard";
import ICatalog from "@interfaces/catalog/ICatalog.ts";

interface HeroProjectListProps {
    isProject: boolean;
    catalog: ICatalog;
    loaded: boolean;
}

export default function ProjectListHero({
    isProject,
    catalog,
    loaded
}: HeroProjectListProps) {
    return (
        <div className={`w-full  p-4 bg-[#FFFFFF] rounded-3xl`}>
            {catalog !== null ? (
                <div>
                    {loaded ? (
                        <ul className="w-full custom-scrollbar overflow-y-auto">
                            {isProject
                                ? catalog.projects.map((project, index) => (
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
                                : catalog.mobilities.map((project, index) => (
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
