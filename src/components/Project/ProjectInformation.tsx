import { useThemeDetector } from "@util/ThemeDetector";
// import { Project } from "../../types";
import getActivity from "@integrations/activity/get_activity";
import { useEffect, useState } from "react";

// export type ProjectInfo = {
//     projectSumUp: {
//         id: number;
//         name: string;
//         language: string;
//         contry: string;
//         applicationStart: string;
//         applicationEnd: string;
//         Status: any;
//     };

// };

type ProjectProps = {
    activity_status: {
        id: number;
        name: string;
    };
    activity_type: {
        id: number;
        name: string;
    };
    courses: [
        {
            course: {
                name: string;
            };
            course_id: number;
        }
    ];
    created_at: string;
    end_date: string;
    id: string;
    languages: [
        {
            language: string;
        }
    ];
    partner_institutions: [
        {
            institution: {
                country: string;
                id: string;
                images: [
                    {
                        image: string;
                    }
                ];
                name: string;
            };
            institution_id: string;
        }
    ];
    start_date: string;
    title: string;
    updated_at: string;
};

interface ProjectInfoProps {
    id: string;
    // onClick: (project: Project) => void;
}

export default function ProjectInformation({ id }: ProjectInfoProps) {
    const [project, setProject] = useState<ProjectProps>({
        activity_status: {
            id: 0,
            name: ""
        },
        activity_type: {
            id: 0,
            name: ""
        },
        courses: [
            {
                course: {
                    name: ""
                },
                course_id: 0
            }
        ],
        created_at: "",
        end_date: "",
        id: "",
        languages: [
            {
                language: ""
            }
        ],
        partner_institutions: [
            {
                institution: {
                    country: "",
                    id: "",
                    images: [
                        {
                            image: ""
                        }
                    ],
                    name: ""
                },
                institution_id: ""
            }
        ],
        start_date: "",
        title: "",
        updated_at: ""
    });

    const handleGetProject = async () => {
        try {
            const projectValue = (await getActivity({
                activity_id: id
            })) as ProjectProps;
            setProject(projectValue);
        } catch (error) {
            console.error("Erro ao obter projeto:", error);
        }
    };
    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        handleGetProject();
    }, []);

    return (
        <div className="custom-scrollbar overflow-y-auto lg:overflow-y-visible flex-col w-full m-3 mb-0 mt-0 ">
            <div
                className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
            >
                <div className="2xs:text-center place-items-center p-2 sm:w-1/6">
                    <img
                        src={
                            project?.partner_institutions[0].institution
                                .images[0].image
                        }
                        alt="institution-img"
                    ></img>
                    <div className="">
                        {project?.partner_institutions[0].institution.name}
                    </div>
                </div>
                <div className="2xs:text-center sm:text-left p-2 sm:w-4/6">
                    <div className="font-extrabold">{project?.title}</div>
                    <div className="">{project?.languages[0].language}</div>
                    <div className="">contry</div>
                </div>
                <div className="2xs:text-center md:text-right sm:w-1/6">
                    <div className={`text-blue-500`}>
                        {project?.activity_status.name}
                    </div>

                    <div className="font{20px}">
                        {/* AINDA TEM Q ARRUMAR A FORMATAÇÃO DA DATA  */}
                        {project?.start_date}
                    </div>
                    <div className="mb-2">{project?.end_date}</div>
                    <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full">
                        Enroll
                    </button>
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
                        {project?.title}
                    </div>
                </div>
                <div
                    className={` justify rounded-3xl p-4 pb-0 md:pb-20 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-1/3 md:ml-2`}
                >
                    <div className="p-3 font-extrabold">Project criteria</div>
                    <div className="custom-scrollbar overflow-y-auto h-full p-3">
                        dumy
                    </div>
                </div>
            </div>
        </div>
    );
}
