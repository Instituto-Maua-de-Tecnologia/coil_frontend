import { useState } from "react";
import { Student } from "../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface EnrolledStudentCardProps {
    enrolledStudent: Student;
}

export default function EnrolledStudentCard({
    enrolledStudent
}: EnrolledStudentCardProps) {
    const isDarkTheme = useThemeDetector();
    const [isApproved, setIsApproved] = useState(enrolledStudent.approval);

    const handleToggleApprovation = () => {
        enrolledStudent.approval = !enrolledStudent.approval;
        setIsApproved(enrolledStudent.approval);
    };

    return (
        <li
            className={`sm:flex items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-2 w-full`}
        >
            <div className="flex sm:relative sm:justify-between w-full">
                <div className="sm:flex w-full sm:items-center">
                    <div className="font-bold w-full">
                        {enrolledStudent.name}
                    </div>
                    <div className="font-bold w-full">{enrolledStudent.ra}</div>
                    <div className="font-bold w-full">
                        {enrolledStudent.course}
                    </div>
                    <div className="mr-2">
                        <button onClick={handleToggleApprovation}>
                            {isApproved ? (
                                <div className="text-blue-500 bg-[#223A4F] text-sm px-4 py-2 my-2 rounded-full">
                                    Unapproved
                                </div>
                            ) : (
                                <div className="text-white min-w-[112px] bg-[#2684FF] text-sm px-4 py-2 my-2 rounded-full">
                                    Approved
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
