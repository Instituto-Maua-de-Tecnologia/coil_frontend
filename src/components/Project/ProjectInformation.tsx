import { useThemeDetector } from "@util/ThemeDetector";
import getActivity from "@integrations/activity/get_activity";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

type ProjectProps = {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    languages: string[];
    courses: [
        {
            id: number;
            name: string;
        }
    ];
    partner_institutions: [
        {
            id?: any;
            institution?: {
                id: string;
                name: string;
                description: string;
                email: string;
                country: string;
                images: string[];
                social_medias: string[];
            };
        }
    ];
    criterias: [
        {
            id?: number;
            criteria?: string;
        }
    ];
    status_activity: number;
    type_activity: number;
    created_at: string;
    updated_at: string;
    applicants: [
        {
            id?: string;
            status?: boolean;
            user?: {
                id: string;
                name: string;
                email: string;
                user_type: number;
                course: null;
                semester_course: number;
                created_at: string;
                updated_at: string;
            };
        }
    ];
};

interface ProjectInfoProps {
    id: string;
    // onClick: (project: Project) => void;
}

export default function ProjectInformation({ id }: ProjectInfoProps) {
    const [project, setProject] = useState<ProjectProps>({
        id: "",
        title: "",
        start_date: "",
        end_date: "",
        description: "",
        languages: [""],
        courses: [
            {
                id: 0,
                name: ""
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
                    country: "",
                    images: [""],
                    social_medias: [""]
                }
            }
        ],
        criterias: [
            {
                id: 0,
                criteria: ""
            }
        ],
        status_activity: 0,
        type_activity: 0,
        created_at: "",
        updated_at: "",
        applicants: [
            {
                id: "",
                status: false,
                user: {
                    id: "",
                    name: "",
                    email: "",
                    user_type: 0,
                    course: null,
                    semester_course: 0,
                    created_at: "",
                    updated_at: ""
                }
            }
        ]
    });
    const [loaded, setLoaded] = useState(false);

    const handleGetProject = async () => {
        try {
            const projectValue = (await getActivity({
                activity_id: id
            })) as ProjectProps;
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

    return (
        <div className="custom-scrollbar overflow-y-auto lg:overflow-y-visible flex-col w-full m-3 mb-0 mt-0 ">
            {loaded ? (
                <>
                    <div
                        className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
                    >
                        <div className="2xs:text-center place-items-center p-2 sm:w-1/6">
                            <img
                                src={
                                    project?.partner_institutions[0]
                                        ?.institution?.images[0]
                                }
                                alt="institution-img"
                            ></img>
                            <div className="">
                                {
                                    project?.partner_institutions[0]
                                        ?.institution?.id
                                }
                            </div>
                        </div>
                        <div className="2xs:text-center sm:text-left p-2 sm:w-4/6">
                            <div className="font-extrabold">
                                {project?.title}
                            </div>
                            <div className="">{project?.languages[0]}</div>
                            <div className="">country</div>
                        </div>
                        <div className="2xs:text-center md:text-right sm:w-1/6">
                            <div className={`text-blue-500`}>
                                {project?.status_activity}
                            </div>

                            <div className="font{20px}">
                                {/*TODO: AINDA TEM Q ARRUMAR A FORMATAÇÃO DA DATA  */}
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
                            <div className="p-3 font-extrabold">
                                Project criteria
                            </div>
                            <div className="custom-scrollbar overflow-y-auto h-full p-3">
                                dumy
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
