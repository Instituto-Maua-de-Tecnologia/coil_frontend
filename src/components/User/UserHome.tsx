import { useThemeDetector } from "@util/ThemeDetector.ts";
// import { useEffect, useState } from "react";

export type UserHomeProps = {
    userHome: {
        id: string;
        name: string;
        email: string;
        user_type: number;
        // course: string;
        // semester_course: number;
        created_at: string;
        updated_at: string;
    };
};

export default function userHome({ userHome }: UserHomeProps) {
    const { name, email } = userHome;
    /* eslint-disable */
    const isDarkTheme = useThemeDetector();
    return (
        <div
            className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} ml-0 md:ml-4 rounded-3xl p-4 w-full md:h-25%`}
        >
            <div className="self-center p-2 sm:w-1/6">
                <img
                    src=""
                    alt="institution-img"
                    className="avatar-img mx-auto sm:-mx-auto w-[23vw] rounded-full "
                />
            </div>
            <div className="2xs:text-center sm:text-left self-center p-2 sm:w-4/6">
                <div className="font-extrabold">{name}</div>
                <div className=" mr-2">
                    {email.substring(0, email.indexOf("@"))}
                </div>
                <div className="font-semibold">
                    Institute Maua Of Technology
                </div>
                <p>{email} </p>
            </div>
        </div>
        /* eslint-enable */
    );
}
