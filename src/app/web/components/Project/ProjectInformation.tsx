import { useThemeDetector } from "@functions/ThemeDetector.ts";
import getActivity from "@integrations/activity/get_activity.ts";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { format } from "date-fns";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import SVGIcon from "@components/ImageInstances/SVGIcon.tsx";
import { useNavigate } from "react-router-dom";
import IProject from "@interfaces/project/IProject";
import IProjectWithData from "@interfaces/project/IProject.ts";
import IUser from "@interfaces/user/IUser.ts";
import ModalInformation from "@components/Modal/ModalInformation.tsx";

interface ProjectInfoProps {
    id: string;
    // onClick: (project: Project) => void;
}

export default function ProjectInformation({ id }: ProjectInfoProps) {
    const [project, setProject] = useState<IProjectWithData>({
        id: "",
        title: "",
        start_date: "",
        end_date: "",
        description: "",
        languages: [
            {
                id: 0,
                language: {
                    id: 0,
                    language: "",
                    language_code: ""
                }
            }
        ],
        partner_institutions: [
            {
                id: "",
                institution: {
                    id: "",
                    name: "",
                    description: "",
                    email: "",
                    countries: [
                        {
                            id: 0,
                            country: {
                                id: 0,
                                country: "",
                                country_code: ""
                            }
                        }
                    ],
                    images: [],
                    social_medias: [
                        {
                            id: 0,
                            media: {
                                id: 0,
                                social_media: ""
                            },
                            link: ""
                        }
                    ]
                }
            }
        ],
        criterias: [
            {
                id: 0,
                criteria: {
                    id: 0,
                    criteria: ""
                }
            }
        ],
        status_activity: 0,
        type_activity:
            window.location.pathname.replace("/", "") === "COILInfo" ? 1 : 2,
        created_at: "",
        updated_at: "",
        applicants: [
            {
                id: "",
                user: {
                    id: "",
                    name: "",
                    email: "",
                    user_type: 0,
                    created_at: "",
                    updated_at: ""
                },
                status: false
            }
        ],
        courses: [
            {
                id: 0,
                course: {
                    id: 0,
                    course: ""
                }
            }
        ]
    });
    const userToken = JSON.parse(
        localStorage.getItem("user") as string
    ) as IUser;

    const [loaded, setLoaded] = useState(false);

    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        const handleGetProject = async () => {
            try {
                const projectValue = (await getActivity({
                    activity_id: id
                })) as IProjectWithData;
                setProject(projectValue);
            } catch (error) {
                console.error("Erro ao obter projeto:", error);
            } finally {
                setLoaded(true);
            }
        };
        void handleGetProject();
    }, [id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "dd/MM/yyyy");
    };

    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );

    useEffect(() => {
        const handleGetEnrolledProjects = async () => {
            await getAllActivitiesEnrolled({
                type_activity: project.type_activity
            })
                .then((response) => {
                    setEnrolledProjectsIds(
                        enrolledIdsToArray(response as IProject[])
                    );
                })
                .catch((error) => {
                    console.error("Erro ao obter projetos:", error);
                });
        };
        const handleGets = async () => {
            await handleGetEnrolledProjects();
        };
        void handleGets();
    }, [project.type_activity]);
    const enrolledIdsToArray = (enrolledProjects: IProject[]) => {
        return enrolledProjects.map((project) => {
            return `${project?.id}`;
        });
    };
    const handleVerifyEnrollment = (id: string) => {
        return enrolledProjectsIds.includes(id);
    };

    const [selectedProject, setSelectedProject] = useState<IProject | null>(
        null
    );

    const handleModalOpen = (project: IProject) => {
        setSelectedProject(project);
    };

    const handleModalClose = () => {
        setSelectedProject(null);
    };

    const navigate = useNavigate();

    return (
        <div className="custom-scrollbar overflow-y-auto lg:overflow-y-visible flex-col w-full m-3 mb-0 mt-0 ">
            {loaded ? (
                <>
                    <div
                        className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
                    >
                        <div className="2xs:text-center place-items-center p-2 sm:w-1/6">
                            <img
                                className={"rounded-full"}
                                src={
                                    project?.partner_institutions[0]
                                        ?.institution?.images[0]
                                }
                                alt="institution-img"
                            ></img>
                        </div>
                        <div className="2xs:text-center sm:text-left p-2 sm:w-4/6">
                            <div className="font-extrabold">
                                {project.title}
                            </div>
                            <div className="flex flex-wrap">
                                {project.languages.map((language, index) => (
                                    <React.Fragment
                                        key={"COIL SVGICon Language" + index}
                                    >
                                        <p className={"text-xs"}>
                                            {language.language.language}
                                        </p>
                                        <SVGIcon
                                            src={`https://hatscripts.github.io/circle-flags/flags/${language.language.language_code}.svg`}
                                            className="w-4 m-[1px]"
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                            {/*<div className="">{project.partner_institutions[0].institution.country}</div>*/}
                        </div>
                        <div className="2xs:text-center md:text-right sm:w-1/6">
                            <div className="">
                                Start Date: {formatDate(project.start_date)}
                            </div>
                            <div className="mb-2">
                                End Date: {formatDate(project.end_date)}
                            </div>
                            {project.status_activity === 2 && (
                                <>
                                    {userToken?.user_type ===
                                        UserTypeEnum.STUDENT.valueOf() && (
                                        <button
                                            onClick={() =>
                                                handleModalOpen(project)
                                            }
                                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                                        >
                                            {handleVerifyEnrollment(project.id)
                                                ? "Withdraw"
                                                : "Apply"}
                                        </button>
                                    )}
                                </>
                            )}
                            {(userToken?.user_type ===
                                UserTypeEnum.ADMIN.valueOf() ||
                                userToken?.user_type ===
                                    UserTypeEnum.MODERATOR.valueOf()) &&
                                project.status_activity !== 1 && (
                                    <button
                                        onClick={() =>
                                            navigate("/EnrolledStudents", {
                                                state: {
                                                    projectID: project.id
                                                }
                                            })
                                        }
                                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                                    >
                                        View Enrolled Students
                                    </button>
                                )}
                            {selectedProject ? (
                                <ModalInformation
                                    project={selectedProject}
                                    enrolled={enrolledProjectsIds.includes(
                                        selectedProject.id
                                    )}
                                    isOpen={true}
                                    onClose={handleModalClose}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className="mt-4 md:flex w-full md:h-3/4">
                        <div
                            className={` justify rounded-3xl p-4 md:pb-20 pb-0 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:w-2/3 md:mr-2`}
                        >
                            <div className="p-3 font-extrabold ">
                                COIL description
                            </div>
                            <div className="custom-scrollbar flex-wrap break-words text-wrap overflow-y-auto  h-full p-3">
                                {project.description}
                            </div>
                        </div>
                        <div
                            className={` justify rounded-3xl p-4 pb-0 md:pb-20 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-1/3 md:ml-2`}
                        >
                            <div className="p-3">
                                <h1 className={"font-extrabold"}>Criteria: </h1>
                                {project.criterias[0]?.criteria?.criteria !==
                                undefined ? (
                                    <ol
                                        className={"ps-6"}
                                        style={{ listStyleType: "decimal" }}
                                    >
                                        {project.criterias.map((fds, index) => (
                                            <li key={"criteriaKey" + index}>
                                                {fds.criteria.criteria}
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p>No Criterias found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center mt-[25vh]">
                    <MoonLoader
                        color={`${isDarkTheme ? "#fff" : "#000"}`}
                        size={35}
                    />
                </div>
            )}
        </div>
    );
}
