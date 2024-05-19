import EnrolledStudentsList from "@components/EnrolledStudentsList";
import SideBar from "@components/GenericComponents/SideBar";
import TitleHeader from "@components/GenericComponents/TitleHeader";
import { useLocation } from "react-router-dom";
import getActivity from "@integrations/activity/get_activity.ts";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { useThemeDetector } from "@util/ThemeDetector.ts";

export default function ViewEnrolledStudents() {
    const location = useLocation();
    const [project, setProject] = useState(location.state?.projectID);
    const [loaded, setLoaded] = useState(false);

    async function getProjectName() {
        try {
            const projecto = await getActivity({ activity_id: project });
            setProject(projecto);
        } catch (e) {
            console.log("falha ao carregar projeto");
        } finally {
            setLoaded(true);
        }
    }

    useEffect(() => {
        getProjectName();
    }, []);
    const isDarkTheme = useThemeDetector();

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader
                    title={`Enrolled Students in ${project.data?.title}`}
                />

                {loaded ? (
                    <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                        <SideBar />
                        <EnrolledStudentsList students={project} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center mt-auto">
                        <MoonLoader
                            color={`${isDarkTheme ? "#fff" : "#000"}`}
                            size={35}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
