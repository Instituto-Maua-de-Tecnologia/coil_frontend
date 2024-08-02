import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import EnrolledStudentCard from "./EnrolledStudentCard.tsx";
import NoElementsFound from "@components/GenericComponents/NoElementsFound.tsx";
import { Button } from "primereact/button";
import IProject from "@interfaces/project/IProject.ts";

interface EnrolledStudentProps {
    students: IProject;
}

export default function EnrolledStudentList({
    students
}: EnrolledStudentProps) {
    const isDarkTheme = useThemeDetector();

    function handleExportApprovedStudents() {
        const applicants = students.applicants;
        if (!applicants) {
            throw new Error("No applicants found");
        }
        const approvedStudents = students.applicants.filter(
            (student) => student.status
        );
        const data = approvedStudents.map((student) => ({
            name: student.user.name,
            email: student.user.email,
            RA: student.user.email.split("@")[0]
        }));

        const headers = "Nome,RA,E-mail";
        const csvRows = data.map(
            (student) => `${student.name},${student.RA},${student.email}`
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

    return (
        <div
            className={`w-full ml-4 px-7 py-4 relative ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="text-end">
                <Button
                    className="mt-1 shadow-md mb-3 right-0"
                    onClick={handleExportApprovedStudents}
                >
                    Export CSV
                </Button>
            </div>
            <div>
                <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                    {students.applicants[0] !== undefined ? (
                        students.applicants.map((applicant, index) => (
                            <EnrolledStudentCard
                                key={index}
                                projectID={students.id}
                                applicant={applicant}
                            />
                        ))
                    ) : (
                        <div className="w-full text-center">
                            <NoElementsFound message="No students were found" />
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}
