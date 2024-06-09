import SVGIcon from "../ImageInstances/SVGIcon";
import { Project } from "../../types";
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
        if (user !== undefined) {
            if (user.user_type === UserTypeEnum.STUDENT) onClick(project);
            else if (
                user.user_type === UserTypeEnum.ADMIN ||
                user.user_type === UserTypeEnum.MODERATOR
            )
                navigate("/EnrolledStudents", {
                    state: {
                        userStatus: user.user_type,
                        type_activity: 1,
                        edit: true,
                        projectID: project.id
                    }
                });
        }
    };
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    return (
        <li
            onClick={() =>
                navigate("/COILInfo", { state: { projectID: project.id } })
            }
            className={`sm:flex items-center cursor-pointer ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full">
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
                                className="avatar-img mx-auto min-w-16 max-w-16 rounded-full"
                            />
                        </div>
                    )}
                    <div className="flex flex-col grow">
                        <div className="mb-2 text-center sm:text-start font-bold">
                            {project.title}
                        </div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-normal w-full">
                                <p className="text-xs mr-2">Languages:</p>
                                <div
                                    className={`grid ${project.languages?.length === 1 ? "grid-cols-1  justify-items-center" : "grid-cols-2"} sm:flex sm:flex-wrap gap-2 w-full`}
                                >
                                    {project.languages?.map(
                                        (project, index) => (
                                            <div
                                                key={
                                                    "Project SVGICon Language" +
                                                    index
                                                }
                                                className="border-[#673366] mt-1 sm:mt-0 flex flex-row border-[1px]  pe-1 ps-2 py-1 items-center justify-between rounded-full text-[#673366]"
                                            >
                                                <p className="text-xs me-2">
                                                    {project.language.language}
                                                </p>
                                                <SVGIcon
                                                    src={`https://hatscripts.github.io/circle-flags/flags/${project.language.language_code}.svg`}
                                                    className="w-4 m-[1px]"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row w-full sm:justify-start justify-center">
                                <p className="text-xs mr-2">
                                    {
                                        project.partner_institutions?.[0]
                                            ?.institution?.countries[0].country
                                            ?.country
                                    }
                                </p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${project.partner_institutions?.[0]?.institution?.countries[0].country?.country_code}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex items-center w-auto sm:min-w-24  gap-4 flex-col sm:justify-end mr-2">
                        <div className={`text-blue-500`}>
                            {project.activity_status?.name}
                        </div>
                        {project.activity_status?.name !== "UNDER_ANALYSIS" &&
                        user.user_type === UserTypeEnum.STUDENT ? (
                            <button
                                onClick={handleOnClick}
                                disabled={
                                    project.activity_status?.name !==
                                    "Apply Now"
                                }
                                className="bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 text-white text-sm px-4 py-2 rounded-full"
                            >
                                <span
                                    title={
                                        project.activity_status?.name !==
                                        "Apply Now"
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
                                disabled={
                                    project.activity_status?.name ===
                                    "Coming Soon"
                                }
                                className={`bg-blue-500 ${project.activity_status?.name === "APPLY_NOW" ? "" : "disabled:opacity-50 disabled:cursor-not-allowed"} text-white text-sm px-4 py-2 rounded-full`}
                            >
                                View Enrolled Students
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}
