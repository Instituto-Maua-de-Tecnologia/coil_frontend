import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    devider,
    activityIcon,
    homeIcon,
    //institutionIcon,
    projectIcon,
    resultsIcon,
    signOutIcon,
    userIcon
} from "@assets/icons";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import { navigation } from "@constants/SideBarProperties.tsx";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";

interface TitleHeaderProps {
    title: string;
    className?: string;
}

export default function TitleHeader({ title, className }: TitleHeaderProps) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const isDarkTheme = useThemeDetector();
    const links =
        JSON.parse(localStorage.getItem("user") as string)?.user_type ===
        UserTypeEnum.STUDENT
            ? [
                  { to: "/Home", label: "Home", icon: homeIcon },
                  // {
                  //     to: "/Institution",
                  //     label: "Institution",
                  //     icon: institutionIcon,
                  //     devider: devider
                  // },
                  {
                      to: "/COIL",
                      label: "COIL",
                      icon: projectIcon,
                      devider: devider
                  },
                  { to: "/Mobilities", label: "Mobility", icon: activityIcon },
                  { to: "/Results", label: "Results", icon: resultsIcon },
                  { to: "/User", label: navigation[5].title, icon: userIcon },
                  { to: "/Signout", label: "Sign Out", icon: signOutIcon }
              ]
            : [
                  { to: "/Home", label: "Home", icon: homeIcon },
                  // {
                  //     to: "/Institution",
                  //     label: "Institution",
                  //     icon: institutionIcon,
                  //     devider: devider
                  // },
                  {
                      to: "/COIL",
                      label: "COIL",
                      icon: projectIcon,
                      devider: devider
                  },
                  { to: "/Mobilities", label: "Mobility", icon: activityIcon },
                  { to: "/User", label: navigation[5].title, icon: userIcon },
                  { to: "/Signout", label: "Sign Out", icon: signOutIcon }
              ];

    function handleNavOpen() {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className={`${className} max-h-[100vh]  m-3 mb-[1rem]`}>
            <div className="h-[64px] top-0 left-0">
                <div
                    className={`relative mx-auto min-h-[64px] lg:rounded-[24px] bg-[#2684ff] ${isNavOpen ? "rounded-tr-3xl rounded-tl-3xl" : "rounded-[24px]"}`}
                >
                    <div
                        className={`absolute flex flex-row ${isDarkTheme ? "text-[#223A4F]" : "text-[#f9fafc]"} items-center top-[16px] left-[20px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold 2xs:text-[28px] lg:text-[30px] tracking-[-1.08px] leading-[normal] ml-[1rem]`}
                    >
                        <div className="lg:hidden pr-[1rem]">
                            <button onClick={handleNavOpen}>
                                {isNavOpen ? (
                                    <>
                                        <svg
                                            className="w-8 h-8"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke={`${isDarkTheme ? "#223A4F" : "#f9fafc"}`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </>
                                ) : (
                                    <svg
                                        className="w-[2rem]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {title}
                    </div>
                </div>
            </div>
            <div className={"lg:hidden"}>
                {isNavOpen && (
                    <div className="px-[20px] rounded-br-3xl rounded-bl-3xl py-[10px] bg-[#2684ff]">
                        <ul className="space-y-2 text-white">
                            {links.map((link, index) => (
                                <li
                                    key={"MobileNavLink" + index}
                                    className={
                                        "w-full mx-1 bg-whte flex items-center"
                                    }
                                >
                                    <Link
                                        to={link.to}
                                        className={`text-white ps-5 bg-[#1B60BC] rounded-full flex items-center w-full`}
                                        type="button"
                                    >
                                        {React.createElement(
                                            link.icon,
                                            {
                                                className: `!fill-current !text-sb-tb me-2 my-2 !transition-colors`
                                            },
                                            link.devider && (
                                                <div className="mx-[1rem] border-b-2 border-gray-200"></div>
                                            )
                                        )}

                                        <h1>{link.label}</h1>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
