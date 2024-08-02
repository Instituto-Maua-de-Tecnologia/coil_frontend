import { useState } from "react";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import updateUserStatusInActivity from "@integrations/activity/admin&moderator/update_user_status_in_activity.ts";
import { Button } from "primereact/button";
import toast from "react-hot-toast";
import IUser from "@interfaces/user/IUser.ts";

interface ApplicantProps {
    applicant: {
        id?: string;
        user?: IUser;
        status?: boolean;
    };
    projectID: string;
}

export default function EnrolledStudentCard({
    applicant,
    projectID
}: ApplicantProps) {
    const isDarkTheme = useThemeDetector();
    const [status, setStatus] = useState<boolean | undefined>(applicant.status);

    const handleToggleApprovation = (newStatus: boolean) => {
        setStatus(newStatus);
    };

    const sendData = async () => {
        await toast.promise(
            updateUserStatusInActivity({
                body: {
                    activity_id: projectID,
                    applicants: [applicant.id ?? ""]
                }
            }),
            {
                loading: `Mudando o status dos usuários...`,
                success: <b>Status dos usuários alterados com sucesso!</b>,
                error: (error: Error) => error.message
            }
        );
    };

    return (
        <li
            className={`sm:flex shadow-sm items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-2 w-full`}
        >
            <div className="flex sm:relative sm:justify-between w-full">
                <div className="sm:flex md:flex-row flex-col text-center w-full sm:items-center">
                    <div className="font-bold w-full">
                        {applicant.user?.name}
                    </div>
                    <div className="font-bold w-full">
                        {applicant.user?.email.substring(
                            0,
                            applicant.user?.email.indexOf("@")
                        )}
                    </div>
                    <div className="font-bold w-full">
                        {applicant.user?.email}
                    </div>
                    <div className="mr-2 mt-2 md:mt-0 flex space-x-2">
                        <button
                            onClick={() => handleToggleApprovation(true)}
                            className={`${
                                status
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 opacity-50 text-black"
                            } text-sm shadow-lg hover:opacity-80 transition-opacity duration-300 px-4 py-2 rounded-full`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={() => handleToggleApprovation(false)}
                            className={`${
                                !status
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 opacity-50 text-black"
                            } text-sm shadow-lg hover:opacity-80 transition-opacity duration-300 px-4 py-2 rounded-full`}
                        >
                            Unapproved
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center absolute bottom-10 right-0.5 left-0.5">
                <Button className="text-center shadow-lg" onClick={sendData}>
                    Enviar dados
                </Button>
            </div>
        </li>
    );
}
