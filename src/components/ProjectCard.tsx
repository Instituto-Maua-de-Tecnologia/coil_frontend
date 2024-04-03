import React from "react";
import SVGIcon from "./SVGIcon";

interface Project {
    id: number;
    avatarUrl: string;
    title: string;
    partnerName: string;
    status: string;
    languages: string[];
    country: string;
}

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { avatarUrl, title, status, languages, country } = project;

    return (
        <li className="flex items-center bg-slate-100 rounded-3xl p-4 mb-4 w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <div className="avatar-wrapper mr-4 w-16">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar-img w-full rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm font-semibold mb-2">
                            {title}
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">Languages:</p>

                                {languages.map((language, index) => (
                                    <SVGIcon
                                        key={index}
                                        src={`https://hatscripts.github.io/circle-flags/flags/${language}.svg`}
                                        className="w-4 m-[1px]"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row items-center">
                                <p className="text-xs">Country:</p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-col gap-4 justify-end mr-2">
                    <div
                        className={` ${status === "Open" ? "text-green-500" : "text-red-500"}`}
                    >
                        {status}
                    </div>
                    <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full">
                        Enroll
                    </button>
                </div>
            </div>
        </li>
    );
}
