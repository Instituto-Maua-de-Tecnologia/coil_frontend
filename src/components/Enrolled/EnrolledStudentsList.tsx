import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../../style/scrollbar.css";
import EnrolledStudentCard from "./EnrolledStudentCard.tsx";
import { ProjectProps } from "@components/Project/ProjectInformation.tsx";

interface EnrolledStudentProps {
    students: ProjectProps;
}

export default function EnrolledStudentList({
    students
}: EnrolledStudentProps) {
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div>
                <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                    {students.data.applicants.map((_: any, index: number) => (
                        <EnrolledStudentCard
                            key={index}
                            projectID={students.data.id}
                            users_applicants={students.data.applicants}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
