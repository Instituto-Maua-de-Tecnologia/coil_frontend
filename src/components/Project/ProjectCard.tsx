import SVGIcon from "../ImageInstances/SVGIcon";
import { countryCodes, Project } from "../../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";

interface ProjectCardProps {
    project: Project;
    enrolled: boolean;
    onClick: (project: Project) => void;
}

export default function ProjectCard({
    project,
    enrolled,
    onClick
}: ProjectCardProps) {
    const handleOnClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        onClick(project);
    };
    function getCountryFullName(codes: string[]): string {
        const countryNames = codes.map((code) => {
            const normalizedCode = code.toLowerCase();
            return countryCodes[normalizedCode] || "Country not found";
        });
        return countryNames.join(" ");
    }
    const countryCodesArray = project.languages.map((fds) => fds.language);
    const countryInstitutionArray = project.partner_institutions.map(
        (fds) => fds.institution.country
    );
    const country = getCountryFullName(countryInstitutionArray);
    const countryName = getCountryFullName(countryCodesArray);
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    return (
        <li
            onClick={() =>
                navigate("/ProjectInfo", { state: { projectID: project.id } })
            }
            className={`sm:flex items-center cursor-pointer ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                        <img
                            src={
                                project.partner_institutions[0].institution
                                    .images[0].image
                            }
                            alt="Avatar"
                            className="avatar-img mx-auto w-16 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2 font-bold">{project.title}</div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">Languages:</p>
                                {project.languages.map((language, index) => (
                                    <React.Fragment
                                        key={"Project SVGICon Language" + index}
                                    >
                                        <p className={"text-xs"}>
                                            {language.language}
                                        </p>
                                        {index % 2 === 0 ? (
                                            <SVGIcon
                                                src={`https://hatscripts.github.io/circle-flags/flags/${countryName.slice(0, 2)}.svg`}
                                                className="w-4 m-[1px]"
                                            />
                                        ) : (
                                            <SVGIcon
                                                src={`https://hatscripts.github.io/circle-flags/flags/${countryName.slice(3, 5)}.svg`}
                                                className="w-4 m-[1px]"
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row w-full sm:justify-start justify-center">
                                <p className="text-xs mr-2">
                                    {
                                        project.partner_institutions[0]
                                            .institution.country
                                    }
                                </p>

                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country.substring(0, 2)}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex sm:absolute sm:right-0 items-center gap-4 flex-col sm:justify-end mr-2">
                        <div className={"text-blue-500"}>
                            {project.activity_status.name.replace("_", " ")}
                        </div>
                        {JSON.parse(localStorage.getItem("user") as string)
                            .user_type === UserTypeEnum.STUDENT && (
                            <button
                                onClick={handleOnClick}
                                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                            >
                                {enrolled ? "Disenroll" : "Enroll"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}
