import SVGIcon from "../ImageInstances/SVGIcon";
import { Project } from "../../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export default function ProjectCardHero({ project }: ProjectCardProps) {
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    return (
        <li
            onClick={() =>
                navigate("/COILInfo", { state: { projectID: project.id } })
            }
            className={`sm:flex items-center cursor-pointer ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    {project.partner_institutions?.[0]?.institution?.images[0]
                        .image !== undefined && (
                        <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                            <img
                                src={
                                    project.partner_institutions?.[0]
                                        ?.institution?.images[0].image
                                }
                                alt="Avatar"
                                className="avatar-img mx-auto w-16 rounded-full"
                            />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <div className="inline-flex flex-row mb-2 text-center sm:text-start font-bold">
                            {project.title}
                        </div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            project description
                        </div>
                        <div className="flex">
                            <p className={"text-xs me-2"}>
                                {
                                    project?.partner_institutions?.[0]
                                        ?.institution?.countries[0]?.country
                                        ?.country
                                }
                            </p>
                            <SVGIcon
                                src={`https://hatscripts.github.io/circle-flags/flags/${project?.partner_institutions?.[0]?.institution?.countries[0]?.country?.country_code}.svg`}
                                className="w-4 m-[1px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
