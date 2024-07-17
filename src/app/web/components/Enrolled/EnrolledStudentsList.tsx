import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import EnrolledStudentCard from "./EnrolledStudentCard.tsx";
import NoElementsFound from "@components/GenericComponents/NoElementsFound.tsx";
import IProject from "@interfaces/project/IProject.ts";

interface EnrolledStudentProps {
    students: IProject;
}

export default function EnrolledStudentList({
    students
}: EnrolledStudentProps) {
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 relative ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div>
                <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                    {students.applicants[0] !== undefined ? (
                        students.applicants.map((_, index: number) => (
                            <EnrolledStudentCard
                                key={index}
                                projectID={students.id}
                                users_applicants={students.applicants}
                            />
                        ))
                    ) : (
                        <div className={"w-full text-center"}>
                            <NoElementsFound message="No students were found" />
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}
