import EnrolledStudentsList from "@components/Enrolled/EnrolledStudentsList.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import { useLocation } from "react-router-dom";
import getActivity from "@integrations/activity/get_activity.ts";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import NoElementsFound from "@components/GenericComponents/NoElementsFound.tsx";
import { AxiosError } from "axios";
import IProject from "@interfaces/project/IProject.ts";

export default function ViewEnrolledStudents() {
    const location = useLocation() as { state: { projectID: string } };
    const [project, setProject] = useState<IProject>({
        applicants: [
            {
                id: "",
                status: false,
                user: {
                    created_at: "",
                    email: "",
                    id: "",
                    name: "",
                    updated_at: "",
                    user_type: 0
                }
            }
        ],
        courses: [{ course: { course: "", id: 0 }, id: 0 }],
        created_at: "",
        criterias: [{ criteria: { criteria: "", id: 0 }, id: 0 }],
        description: "",
        end_date: "",
        languages: [
            { id: 0, language: { id: 0, language: "", language_code: "" } }
        ],
        partner_institutions: [
            {
                id: "",
                institution: {
                    countries: [
                        {
                            country: { country: "", country_code: "", id: 0 },
                            id: 0
                        }
                    ],
                    description: "",
                    email: "",
                    id: "",
                    images: [],
                    name: "",
                    social_medias: [
                        { id: 0, link: "", media: { id: 0, social_media: "" } }
                    ]
                }
            }
        ],
        start_date: "",
        status_activity: 0,
        title: "",
        type_activity: 0,
        updated_at: "",
        id: location.state?.projectID
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getProjectName() {
            const response = await getActivity({ activity_id: project.id })
                .catch((e: AxiosError) => console.error(e.message))
                .finally(() => setLoaded(true));
            setProject(response as IProject);
        }
        void getProjectName();
    }, []);
    const isDarkTheme = useThemeDetector();

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={`Enrolled Students in ${project?.title}`} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    {loaded ? (
                        project?.applicants !== undefined ? (
                            <EnrolledStudentsList students={project} />
                        ) : (
                            <div className={"w-full text-center"}>
                                <NoElementsFound message="No students were found" />
                            </div>
                        )
                    ) : (
                        <div className="flex justify-center w-full h-screen items-center mt-auto">
                            <MoonLoader
                                color={`${isDarkTheme ? "#f9f9f9" : "#090909"}`}
                                size={35}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
