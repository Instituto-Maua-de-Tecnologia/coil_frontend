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
    console.log(project);

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

    // @ts-expect-error FIXME: Needs to implement this function after task "disable and enable" button is done
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleExportApprovedStudents() {
        const applicants = project.data.applicants;
        if (!applicants) {
            throw new Error("No applicants found");
        }
        const approvedStudents = project.data.applicants.filter(
            (student: any) => student.status === true
        );
        const data = approvedStudents.map((student: any) => ({
            name: student.name,
            email: student.email,
            RA: student.email.split("@")[0]
        }));

        const headers = "Nome,RA,E-mail";
        const csvRows = data.map(
            (student: any) => `${student.name},${student.RA},${student.email}`
        );
        const csvContent = [headers, ...csvRows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "approved_students.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        getProjectName();
    }, []);
    const isDarkTheme = useThemeDetector();

    // FIXME: Show the students enrolled, some projects of COIL/mobility are undefiened

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader
                    title={`Enrolled Students in ${project?.data?.title}`}
                />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    {loaded ? (
                        project?.data?.applicants > 0 ? (
                            <EnrolledStudentsList students={project} />
                        ) : (
                            <div className={"w-full text-center"}>
                                <NoElementsFound message="No students were found" />
                            </div>
                        )
                    ) : (
                        <div className="flex justify-center items-center mt-auto">
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
