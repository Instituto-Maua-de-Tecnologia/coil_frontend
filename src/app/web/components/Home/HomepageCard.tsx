import SVGIcon from "../ImageInstances/SVGIcon.tsx";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";
import IUser from "@interfaces/user/IUser.ts";
import IAllProjects from "@interfaces/project/IAllProjects.ts";

interface ProjectCardProps {
    project: IAllProjects;
    enrolled: boolean;
    onClick: (project: IAllProjects) => void;
}

export default function HomepageCard({
    project,
    enrolled,
    onClick
}: ProjectCardProps) {
    const user = JSON.parse(localStorage.getItem("user") as string) as IUser;
    const handleOnClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        if (user !== undefined) {
            if (user.user_type === UserTypeEnum.STUDENT.valueOf())
                onClick(project);
            else if (
                user.user_type === UserTypeEnum.ADMIN.valueOf() ||
                user.user_type === UserTypeEnum.MODERATOR.valueOf()
            )
                navigate("/EnrolledStudents", {
                    state: {
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
                navigate(
                    project?.activity_type.id === 1
                        ? "/COILInfo"
                        : "/MobilityInfo",
                    { state: { projectID: project.id } }
                )
            }
            className={`sm:flex transform hover:-translate-y-1 mt-1 transition-transform duration-300 shadow-sm items-center cursor-pointer ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    {project.partner_institutions?.[0]?.institution?.images[0]
                        ?.image !== null && (
                        <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                            <img
                                src={
                                    project.partner_institutions?.[0]
                                        ?.institution?.images[0]?.image ?? ""
                                }
                                alt="Avatar"
                                className="object-contain mt-1 mb-4 sm:mt-0 sm:mb-0 drop-shadow-sm mx-auto max-w-32 sm:max-w-24 rounded-full"
                            />
                        </div>
                    )}
                    <div className="flex flex-col flex-grow">
                        <div className="inline-flex flex-row mb-2 text-center sm:text-start font-bold w-full justify-center sm:justify-normal">
                            {project.title}
                            <div
                                title={
                                    project.activity_type.id === 1
                                        ? "COIL"
                                        : "Mobility"
                                }
                                className={`w-auto flex min-h-10 max-h-10 shadow  sm:h-full justify-center items-center rounded-full p-1 px-2 ml-2 text-xs font-medium ${
                                    project.activity_type.id === 1
                                        ? `${isDarkTheme ? "bg-blue-50 text-blue-700" : "bg-blue-200 text-blue-700"}`
                                        : "bg-yellow-50 text-yellow-700"
                                }`}
                            >
                                {project?.activity_type.id === 1
                                    ? "COIL"
                                    : "Mobility"}
                            </div>
                        </div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-normal w-full">
                                <p className="text-xs mr-2">Languages:</p>
                                <div
                                    className={`grid ${project.languages?.length === 1 ? "grid-cols-1 justify-items-center" : "grid-cols-2"} !flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full`}
                                >
                                    {project.languages?.map(
                                        (project, index) => (
                                            <div
                                                key={
                                                    "Project SVGICon Language" +
                                                    index
                                                }
                                                className={`border-[#673366] mt-1 sm:mt-0 flex sm:flex-row border-[1px] pe-1 ps-2 py-1 items-center gap-2 justify-center sm:justify-between rounded-full ${isDarkTheme ? "text-[#8e468d]" : "text-[#673366]"}`}
                                            >
                                                <p className="text-xs">
                                                    {project.language.language}
                                                </p>
                                                <SVGIcon
                                                    src={`https://hatscripts.github.io/circle-flags/flags/${project.language.language_code}.svg`}
                                                    className="w-4 drop-shadow m-[1px]"
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
                                    className="w-4 drop-shadow m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex items-center w-auto sm:min-w-24  gap-4 flex-col sm:justify-end mr-2">
                        <div className={`text-blue-500 mb-3 font-medium`}>
                            {project.activity_status.name}
                        </div>
                        {project.activity_status.name !== "Under Analysis" &&
                        user.user_type === UserTypeEnum.STUDENT.valueOf() ? (
                            <button
                                onClick={handleOnClick}
                                disabled={
                                    project.activity_status.name !== "Apply Now"
                                }
                                className="bg-blue-500 w-full py-3 my-2 shadow-lg hover:shadow-xl hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50 text-white text-sm px-4 sm:py-2 rounded-full"
                            >
                                <span
                                    title={
                                        project.activity_status.name !==
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
                                    project.activity_status.name ===
                                    "Coming Soon"
                                }
                                className={`shadow-lg w-full hover:shadow-xl hover:opacity-80 transition-opacity duration-300 bg-blue-500 text-white ${project.activity_status.name === "Apply Now" ? "" : "disabled:opacity-50 disabled:cursor-not-allowed"} text-sm px-4 py-2 rounded-full`}
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
