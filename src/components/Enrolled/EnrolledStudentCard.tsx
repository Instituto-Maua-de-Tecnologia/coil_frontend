import { useState } from "react";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import React from "react";
import updateUserStatusInActivity from "@integrations/activity/admin&moderator/update_user_status_in_activity.ts";
import getActivity from "@integrations/activity/get_activity.ts";

interface User {
    id: string;
    name: string;
    email: string;
    user_type: number;
    created_at: string;
    updated_at: string;
}

interface Applicant {
    id?: string;
    user?: User;
    status?: boolean;
}

interface Applicants {
    users_applicants: any;
    projectID: string;
}

export default function EnrolledStudentCard({
    users_applicants,
    projectID
}: Applicants) {
    const isDarkTheme = useThemeDetector();
    const [applicants, setApplicants] = useState<Applicant[]>(users_applicants);

    const handleToggleApprovation = async () => {
        try {
            await updateUserStatusInActivity({
                body: {
                    activity_id: projectID,
                    applicants: users_applicants
                }
            });
            await getActivity({
                activity_id: projectID
            }).then((response: any) => {
                setApplicants(response?.data.applicants);
            });
        } catch (e: any) {
            throw new Error(e);
        }
    };

    return (
        <li
            className={`sm:flex items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-2 w-full`}
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
                            <div className="mr-2">
                                <button
                                    onClick={() => handleToggleApprovation()}
                                >
                                    {(applicants[index].status as boolean) ? (
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
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </li>
    );
}
