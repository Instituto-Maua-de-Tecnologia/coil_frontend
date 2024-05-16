import { useThemeDetector } from "@util/ThemeDetector.ts";
import account_circle from "@assets/icons/account_circle.png";
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
            className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} ml-0 lg:ml-4 rounded-3xl p-4 w-full md:h-25%`}
        >
            <div className="self-center p-2 sm:w-1/6">
                <img
                    src={account_circle}
                    alt="institution-img"
                    className="avatar-img mx-auto sm:-mx-auto w-[7.23vw] rounded-full "
                />
            </div>
            <div className="2xs:text-center sm:text-left self-center p-2 sm:w-4/6">
                <div className="font-extrabold text-[32px]">{name}</div>
                <div className="mr-2 text-[16px]">
                    {email.substring(0, email.indexOf("@"))}
                </div>
                <div className="font-semibold text-[16px]">
                    Institute Maua Of Technology
                </div>
                <p className={"text-[16px]"}>{email} </p>
            </div>
        </div>
        /* eslint-enable */
    );
}
