import React from "react";
import { Project } from "../types";
import SVGIcon from "./SVGIcon";

interface ModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ project, isOpen, onClose }) => {
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
                        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-blue-500  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="avatar-wrapper mr-4 w-16">
                                        <img
                                            src={project.avatarUrl}
                                            alt="Avatar"
                                            className="avatar-img w-full rounded-full"
                                        />
                                    </div>

                                    <div className="w-full mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-white text-center">
                                            {project.title}
                                        </h3>
                                        <div className="mt-2 flex flex-row justify-between">
                                            <div className="flex flex-col justify-end">
                                                <div className="flex flex-row items-center">
                                                    <p className="text-sm text-white mr-2">
                                                        Languages:
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
                                                    <p className="text-sm text-white">
                                                        Country:
                                                    </p>
                                                    <SVGIcon
                                                        src={`https://hatscripts.github.io/circle-flags/flags/${project.country}.svg`}
                                                        className="w-4 m-[1px]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="">
                                                <p
                                                    className={` text-sm text-end font-semibold ${status === "Open" ? "text-green-500" : "text-red-500"}`}
                                                >
                                                    {project.status}
                                                </p>
                                                <p className="text-white text-sm text-end">
                                                    Start date:{" "}
                                                    <span>09-04-2024</span>
                                                </p>
                                                <p className="text-white text-sm text-end">
                                                    End date:{" "}
                                                    <span>14-06-2024</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className=" w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-purple-800 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
