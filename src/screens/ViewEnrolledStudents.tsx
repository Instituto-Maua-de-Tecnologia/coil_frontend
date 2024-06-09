import EnrolledStudentsList from "@components/Enrolled/EnrolledStudentsList.tsx";
import SideBar from "@components/GenericComponents/SideBar";
import TitleHeader from "@components/GenericComponents/TitleHeader";
import { useLocation } from "react-router-dom";
import getActivity from "@integrations/activity/get_activity.ts";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import NoElementsFound from "@components/GenericComponents/NoElementsFound.tsx";

export default function ViewEnrolledStudents() {
    const location = useLocation();
    const [project, setProject] = useState(location.state?.projectID);
    const [loaded, setLoaded] = useState(false);

    async function getProjectName() {
        const response = await getActivity({ activity_id: project })
            .catch((e) => console.error(e.message))
            .finally(() => setLoaded(true));
        setProject(response);
    }

    useEffect(() => {
        getProjectName();
    }, []);
    const isDarkTheme = useThemeDetector();

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader
                    title={`Enrolled Students in ${project?.data?.title}`}
                />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    {loaded ? (
                        project?.data?.applicants !== undefined ? (
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
