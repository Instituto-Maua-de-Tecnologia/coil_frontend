import { useThemeDetector } from "@util/ThemeDetector";
import getActivity from "@integrations/activity/get_activity";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { format } from "date-fns";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import { ActivityStatusEnum } from "@enum/ActivityStatusEnum.ts";
import SVGIcon from "@components/ImageInstances/SVGIcon.tsx";
import { useNavigate } from "react-router-dom";

export interface ProjectProps {
    data: {
        id: string;
        title: string;
        start_date: string;
        end_date: string;
        description: string;
        languages: [
            {
                id: number;
                language: {
                    id: number;
                    language: string;
                    language_code: string;
                };
            }
        ];
        partner_institutions: [
            {
                id?: string;
                institution?: {
                    id: string;
                    name: string;
                    description: string;
                    email: string;
                    countries: [
                        {
                            id?: number;
                            country?: {
                                id: number;
                                country: string;
                                country_code: string;
                            };
                        }
                    ];
                    images: string[];
                    social_medias: [
                        {
                            id?: number;
                            media?: {
                                id: number;
                                social_media: string;
                            };
                            link?: string;
                        }
                    ];
                };
            }
        ];
        criterias: {
            id: number;
            criteria: {
                id: number;
                criteria: string;
            };
        }[];
        status_activity: number;
        type_activity: number;
        created_at: string;
        updated_at: string;
        applicants: [
            {
                id?: string;
                user?: {
                    id: string;
                    name: string;
                    email: string;
                    user_type: number;
                    created_at: string;
                    updated_at: string;
                };
                status?: boolean;
            }
        ];
        courses: [
            {
                id: number;
                course: {
                    id: number;
                    course: string;
                };
            }
        ];
    };
}

interface ProjectInfoProps {
    id: string;
    // onClick: (project: Project) => void;
}

export default function ProjectInformation({ id }: ProjectInfoProps) {
    const [project, setProject] = useState<ProjectProps>({
        data: {
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
            type_activity: 0,
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
        }
    });
    const [loaded, setLoaded] = useState(false);

    const handleGetProject = async () => {
        try {
            const projectValue = (await getActivity({
                activity_id: id
            })) as ProjectProps;
            console.log(projectValue);
            setProject(projectValue);
        } catch (error) {
            console.error("Erro ao obter projeto:", error);
        } finally {
            setLoaded(true);
        }
    };
    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        handleGetProject();
    }, [id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "dd/MM/yyyy");
    };

    const [enrolledProjectsIds, setEnrolledProjectsIds] = useState<string[]>(
        []
    );
    const handleGetEnrolledProjects = async () => {
        await getAllActivitiesEnrolled({ type_activity: 1 })
            .then((response) => {
                setEnrolledProjectsIds(
                    enrolledIdsToArray(response as ProjectProps[])
                );
            })
            .catch((error) => {
                console.error("Erro ao obter projetos:", error);
            });
    };
    useEffect(() => {
        const handleGets = async () => {
            await handleGetEnrolledProjects();
        };
        handleGets();
    }, []);
    const enrolledIdsToArray = (enrolledProjects: ProjectProps[]) => {
        return enrolledProjects.map((project) => {
            return `${project.data.id}`;
        });
    };
    const handleVerifyEnrollment = (id: string) => {
        return enrolledProjectsIds.includes(id);
    };

    const getStatusText = (status: number): string => {
        switch (status as ActivityStatusEnum) {
            case ActivityStatusEnum.TO_START:
                return "COMING SOON";
            case ActivityStatusEnum.ACTIVE:
                return "APPLY NOW";
            case ActivityStatusEnum.ON_HOLD:
                return "UNDER ANALYSIS";
            case ActivityStatusEnum.ENDED:
                return "ENDED";
            case ActivityStatusEnum.CANCELED:
                return "CANCELED";
            default:
                return "Unknown status";
        }
    };
    const statusText = getStatusText(project.data.status_activity);
    const navigate = useNavigate();

    return (
        <div className="custom-scrollbar overflow-y-auto lg:overflow-y-visible flex-col w-full m-3 mb-0 mt-0 ">
            {loaded ? (
                <>
                    <div
                        className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
                    >
                        {/*<div className="2xs:text-center place-items-center p-2 sm:w-1/6">*/}
                        {/*    <img*/}
                        {/*        src={*/}
                        {/*            project?.data.partner_institutions[0]*/}
                        {/*                ?.institution?.images[0]*/}
                        {/*        }*/}
                        {/*        alt="institution-img"*/}
                        {/*    ></img>*/}
                        {/*    <div className="">*/}
                        {/*        {*/}
                        {/*            project?.data.partner_institutions[0]*/}
                        {/*                ?.institution?.id*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="2xs:text-center sm:text-left p-2 sm:w-4/6">
                            <div className="font-extrabold">
                                {project.data.title}
                            </div>
                            <div className="flex">
                                {project.data.languages.map(
                                    (language, index) => (
                                        <React.Fragment
                                            key={
                                                "Project SVGICon Language" +
                                                index
                                            }
                                        >
                                            <p className={"text-xs"}>
                                                {language.language.language}
                                            </p>
                                            <SVGIcon
                                                src={`https://hatscripts.github.io/circle-flags/flags/${language.language.language_code}.svg`}
                                                className="w-4 m-[1px]"
                                            />
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                            {/*<div className="">{project.data.partner_institutions[0].institution.country}</div>*/}
                        </div>
                        <div className="2xs:text-center md:text-right sm:w-1/6">
                            <div className={`text-blue-500`}>{statusText}</div>

                            <div className="">
                                {/*TODO: AINDA TEM Q ARRUMAR A FORMATAÇÃO DA DATA  */}
                                Start Date:{" "}
                                {formatDate(project.data.start_date)}
                            </div>
                            <div className="mb-2">
                                End Date: {formatDate(project.data.end_date)}
                            </div>
                            {JSON.parse(localStorage.getItem("user") as string)
                                .user_type === UserTypeEnum.STUDENT && (
                                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full">
                                    {handleVerifyEnrollment(project.data.id)
                                        ? "Disenroll"
                                        : "Enroll"}
                                </button>
                            )}
                            {JSON.parse(localStorage.getItem("user") as string)
                                .user_type === UserTypeEnum.ADMIN && (
                                <button
                                    onClick={() =>
                                        navigate("/EnrolledStudents", {
                                            state: {
                                                projectID: project.data.id
                                            }
                                        })
                                    }
                                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                                >
                                    Students Enrolled
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 md:flex w-full md:h-3/4">
                        <div
                            className={` justify rounded-3xl p-4 md:pb-20 pb-0 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:w-2/3 md:mr-2`}
                        >
                            <div className="p-3 font-extrabold ">
                                Project description
                            </div>
                            <div className="custom-scrollbar overflow-y-auto  h-full p-3">
                                {project.data.title}
                            </div>
                        </div>
                        <div
                            className={` justify rounded-3xl p-4 pb-0 md:pb-20 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-1/3 md:ml-2`}
                        >
                            <div className="p-3 font-extrabold">
                                <h1>Criteria: </h1>
                                {/* {project.data.criterias[0].criteria.criteria} */}
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
