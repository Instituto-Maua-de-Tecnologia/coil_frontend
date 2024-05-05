import React from "react";
import SVGIcon from "./SVGIcon";
import { countryCodes, Project } from "../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface ModalProps {
    project: Project; // eslint-disable-line
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ project, isOpen, onClose }) => {
    function getCountryFullName(code: string): string {
        const countryCode = code.toLowerCase();
        return countryCodes[countryCode] || "Country not found";
    }
    const countryName = getCountryFullName(project.country);
    const isDarkTheme = useThemeDetector();

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[560px] sm:w-full">
                            <div
                                className={`${isDarkTheme ? "bg-[#0F1820]" : "bg-[#2684FF]"} px-4 pt-5 pb-4 sm:p-6 sm:pb-6`}
                            >
                                <div className="sm:flex sm:items-center">
                                    <div className="avatar-wrapper text-center flex-col w-24">
                                        <img
                                            src={project.avatarUrl}
                                            alt="Avatar"
                                            className="avatar-img w-full rounded-full bg-white"
                                        />
                                        <h3
                                            className={"text-white font-medium"}
                                        >
                                            {project.partnerName}
                                        </h3>
                                    </div>

                                    <div className="w-full mt-3 sm:mt-0 sm:ml-4">
                                        <h3 className="leading-6 pb-4 text-[1.5rem] font-bold text-white">
                                            {project.title}
                                        </h3>
                                        <div className="mt-2 flex flex-row justify-between">
                                            <div className="flex flex-col justify-end">
                                                <div className="flex flex-row items-center">
                                                    <p className="text-sm pe-2 text-white mr-2">
                                                        Languages
                                                    </p>
                                                    {project.languages.map(
                                                        (language, index) => (
                                                            <SVGIcon
                                                                key={index}
                                                                src={`https://hatscripts.github.io/circle-flags/flags/${language}.svg`}
                                                                className="w-4 m-[1px]"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <div className="flex flex-row items-center">
                                                    <p className="text-sm pe-2 text-white">
                                                        {countryName}
                                                    </p>
                                                    <SVGIcon
                                                        src={`https://hatscripts.github.io/circle-flags/flags/${project.country}.svg`}
                                                        className="w-4 m-[1px]"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <p
                                                    className={`text-lg text-end font-bold ${project.status === "Open" ? "text-[#44DF54]" : "text-red-500"}`}
                                                >
                                                    {project.status}
                                                </p>
                                                <p className="text-white text-sm text-end">
                                                    Application start date:{" "}
                                                    <span>09-04-2024</span>
                                                </p>
                                                <p className="text-white text-sm text-end">
                                                    Application end date:{" "}
                                                    <span>14-06-2024</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${isDarkTheme ? "bg-[#223A4F]" : "bg-white"} gap-1 px-4 w-full items-center py-3 sm:px-6 flex flex-row-reverse`}
                            >
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="inline-flex max-h-[45px] max-w-[128px] justify-center rounded-full border border-transparent shadow-sm py-1 px-4 bg-[#673366] text-base font-medium text-white hover:bg-opacity-80 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex max-h-[45px] max-w-[128px] justify-center rounded-full border border-transparent shadow-sm px-3 py-1 bg-[#2684FF] text-base font-medium text-white hover:bg-opacity-75 focus:outline-none sm:ml-3 w-auto sm:text-sm"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
