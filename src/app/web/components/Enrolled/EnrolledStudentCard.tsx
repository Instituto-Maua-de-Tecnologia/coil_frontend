import React, { useState } from "react";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import updateUserStatusInActivity from "@integrations/activity/admin&moderator/update_user_status_in_activity.ts";
import { Button } from "primereact/button";
import toast from "react-hot-toast";
import IUser from "@interfaces/user/IUser.ts";
import IStudent from "@interfaces/user/IStudent.ts";

interface Applicants {
    users_applicants: {
        id?: string;
        user?: IUser;
        status?: boolean;
    }[];
    projectID: string;
}

export default function EnrolledStudentCard({
    users_applicants,
    projectID
}: Applicants) {
    const isDarkTheme = useThemeDetector();
    const [applicants, setApplicants] =
        useState<Applicants["users_applicants"]>(users_applicants);

    const handleToggleApprovation = (index: number, status: boolean) => {
        setApplicants((prevApplicants) =>
            prevApplicants.map((applicant, i) =>
                i === index ? { ...applicant, status } : applicant
            )
        );
    };

    const sendData = async () => {
        await toast.promise(
            updateUserStatusInActivity({
                body: {
                    activity_id: projectID,
                    applicants: applicants.map(
                        (applicant) => applicant.id ?? ""
                    )
                }
            }),
            {
                loading: `Mudando o status dos usuários...`,
                success: <b>Status dos usuários alterados com sucesso</b>,
                error: (error: Error) => error.message
            }
        );
    };

    function handleExportApprovedStudents() {
        if (!applicants) {
            throw new Error("No applicants found");
        }
        let data = [
            {
                name: "",
                email: "",
                RA: ""
            }
        ] as IStudent[];
        applicants.map((applicant) => {
            if (applicant.status === true) {
                data = [
                    {
                        name: applicant.user?.name as string,
                        email: applicant.user?.email as string,
                        RA: applicant.user?.email.split("@")[0] as string
                    }
                ];
            }
        });

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
        <>
            <div className={"text-end"}>
                <Button
                    className={"mt-1 shadow-md mb-3 right-0"}
                    onClick={handleExportApprovedStudents}
                >
                    Export CSV
                </Button>
            </div>
            <li
                className={`sm:flex shadow-sm items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-2 w-full`}
            >
                <div className="flex sm:relative sm:justify-between w-full">
                    <div className="sm:flex w-full sm:items-center">
                        {applicants.map((user_applicant, index) => (
                            <React.Fragment key={"ResultsCard" + index}>
                                <div className="font-bold w-full">
                                    {user_applicant.user?.name}
                                </div>
                                <div className="font-bold w-full">
                                    {user_applicant.user?.email.substring(
                                        0,
                                        user_applicant.user?.email.indexOf("@")
                                    )}
                                </div>
                                <div className="font-bold w-full">
                                    {user_applicant.user?.email}
                                </div>
                                <div className="mr-2 flex space-x-2">
                                    <button
                                        onClick={() =>
                                            handleToggleApprovation(index, true)
                                        }
                                        className={`${
                                            user_applicant.status
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-300 opacity-50 text-black"
                                        } text-sm shadow-lg hover:opacity-80 transition-opacity duration-300 px-4 py-2 rounded-full`}
                                    >
                                        Approved
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleToggleApprovation(
                                                index,
                                                false
                                            )
                                        }
                                        className={`${
                                            !user_applicant.status
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-300 opacity-50 text-black"
                                        } text-sm shadow-lg hover:opacity-80 transition-opacity duration-300 px-4 py-2 rounded-full`}
                                    >
                                        Unapproved
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div
                    className={
                        "text-center absolute bottom-10 right-0.5 left-0.5"
                    }
                >
                    <Button
                        className={"text-center shadow-lg"}
                        onClick={() => sendData()}
                    >
                        Enviar dados
                    </Button>
                </div>
            </li>
        </>
    );
}
