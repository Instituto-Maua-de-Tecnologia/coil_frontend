import { useState } from "react";
import Search from "./GenericComponents/Search";
import { Student } from "../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";
import EnrolledStudentCard from "./EnrolledStudentCard";

interface EnrolledStudentProps {
    students: Student[];
}
export default function EnrolledStudentList({
    students
}: EnrolledStudentProps) {
    const [filteredEnrolledStudents, setFilteredEnrolledStudents] =
        useState<Student[]>(students);

    const handleSearch = (searchTerm: string) => {
        const filtered = students.filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEnrolledStudents(filtered);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search disabled={false} onSearch={handleSearch} />
            </div>
            {filteredEnrolledStudents.length > 0 ? (
                <>
                    {/* <div className="table-header flex p-4 mb-2">
                        <h1 className="font-bold text-[#0F1820]">Name</h1>
                        <h1 className="font-bold text-[#0F1820]">R.A.</h1>
                        <h1 className="font-bold text-[#0F1820]">Course</h1>
                        <h1 className="font-bold text-[#0F1820]">Approval</h1>
                    </div> */}
                    <div>
                        <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                            {filteredEnrolledStudents.map((student) => (
                                <EnrolledStudentCard
                                    enrolledStudent={student}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No student matched the search criteria
                </p>
            )}
        </div>
    );
}
