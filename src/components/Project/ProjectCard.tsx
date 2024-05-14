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
    const user = JSON.parse(localStorage.getItem("user") as string);
    const handleOnClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        if (user.user_type === UserTypeEnum.STUDENT) onClick(project);
        else if (user.user_type === UserTypeEnum.ADMIN)
            navigate("/CreateProject", { state: { userStatus: 3 } });
    };
    function getCountryFullName(codes: string[]): string {
        const countryNames = codes.map((code) => {
            const normalizedCode = code.toLowerCase();
            return countryCodes[normalizedCode] || "Country not found";
        });
        return countryNames.join(" ");
    }
    const countryCodesArray = project.languages.map((fds) => fds.language);
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
            <div className="flex sm:relative w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    <div className="w-full flex">
                        {/* <div className="sm:avatar-wrapper sm:flex flex-col sm:mr-4">
                            <img
                                src={
                                    project.partner_institutions[0].institution
                                        .images[0].image
                                }
                                alt="Avatar"
                                className="avatar-img mx-auto w-16 rounded-full"
                            />
                        </div> */}
                        <div className="flex flex-col ml-2">
                            <div className="mb-2 text-center sm:text-start font-bold">
                                {project.title}
                            </div>
                            <div className="flex mb-2 w-full sm:justify-start justify-center">
                                <div className="flex flex-col sm:flex-row items-center">
                                    <p className="text-xs mr-2">Languages:</p>
                                    {project.languages.map(
                                        (language, index) => (
                                            <div
                                                key={
                                                    "Project SVGICon Language" +
                                                    index
                                                }
                                                className={
                                                    "border-[#673366] mt-2 sm:mt-0 flex-row border-[1px] ms-2 pe-1 ps-2 py-1 items-center flex rounded-full text-[#673366]"
                                                }
                                            >
                                                <p className={"text-xs me-2"}>
                                                    {language.language
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        language.language.slice(
                                                            1
                                                        )}
                                                </p>
                                                {index % 2 === 0 ? (
                                                    <SVGIcon
                                                        src={`https://hatscripts.github.io/circle-flags/flags/${countryName.slice(0, 2)}.svg`}
                                                        className="w-4 m-[1px]"
                                                    />
                                                ) : (
                                                    <SVGIcon
                                                        src={`https://hatscripts.github.io/circle-flags/flags/${countryName.slice(index + 2, index + 4)}.svg`}
                                                        className="w-4 m-[1px]"
                                                    />
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="flex">
                                <p className={"text-xs me-2"}>
                                    {
                                        project.partner_institutions[0]
                                            .institution.country
                                    }
                                </p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${countryCodes[project.partner_institutions[0].institution.country.toLowerCase()]}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end w-full gap-4 flex-col mr-2">
                        <div className={"text-blue-500"}>
                            {project.activity_status.name.replace("_", " ")}
                        </div>

                        {project.activity_status.name !== "ON_HOLD" &&
                        user.user_type === UserTypeEnum.STUDENT ? (
                            <button
                                onClick={handleOnClick}
                                disabled={
                                    project.activity_status.name !== "ACTIVE"
                                }
                                className="bg-blue-500 disabled:opacity-50 min-w-[95px] text-white text-sm px-4 py-2 rounded-full"
                            >
                                <span
                                    title={
                                        project.activity_status.name !==
                                        "ACTIVE"
                                            ? "This project is not appliable"
                                            : `Apply for ${project.title}`
                                    }
                                >
                                    {enrolled ? "Withdraw" : "Apply"}
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={handleOnClick}
                                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}
