// import { useState } from 'react'
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navigation } from "@constants/SideBarProperties.ts";
import { useThemeDetector } from "../util/ThemeDetector";

export default function SideBar() {
    const isDarkTheme = useThemeDetector();
    const pathname = useLocation();
    // const [openNavigation, setOpenNavigation] = useState(false)

    // const handleClick = () => {
    //     if (!openNavigation) return;

    //     setOpenNavigation(false)
    // }

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const shouldRemovePaddingAndMargin = screenHeight <= 700;
    return (
        <div className={`flex`}>
            <div
                className={`lg:block relative hidden w-[13rem] bg-sb-bg rounded-3xl`}
            >
                <div
                    className={`flex  flex-col ${shouldRemovePaddingAndMargin ? "pt-0" : "pt-[2vh]"} items-center justify-center`}
                >
                    <img
                        src={
                            !isDarkTheme
                                ? "maua-fontys-light.svg"
                                : "maua-fontys-dark.svg"
                        }
                        alt="COIL logo"
                        width={screenHeight <= 590 ? 100 : 130}
                        height={screenHeight <= 590 ? 100 : 130}
                    />
                    <ul
                        className={`${shouldRemovePaddingAndMargin ? "pt-0" : "pt-[2vh]"} w-full pointer-events-auto`}
                    >
                        {navigation.map((item, index) => (
                            <a key={"SideBar " + index} href={item.url}>
                                <li
                                    className={`${shouldRemovePaddingAndMargin ? "mb-2" : "mb-[1.25vh]"}                              
                                    ${item.gap && `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[5vh]"}`} 
                                    ${item.purple && `!bg-sb-p ${screenHeight >= 700 ? "absolute bottom-0 w-12" : ""} ${shouldRemovePaddingAndMargin ? "mb-0" : "mb-[2vh]"} w-[75%] !text-white hover:opacity-80`}
                                    ${item.blue && `!bg-sb-t ${screenHeight >= 700 ? "absolute bottom-16" : ""} !text-white hover:opacity-80 w-[75%]`}
                                    ${item.smgap ? `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[4vh]"}` : `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[1vh]"}`}
                                    ${item.br ? "-mt-[0.4rem]" : `flex items-center justify-left rounded-3xl p-[1vh] mx-[1.5rem] cursor-pointer bg-sb-tb text-sb-t text-md font-medium `}
                                    ${item.url === pathname.pathname && !item.purple ? "!fill-current  !bg-sb-t !text-sb-bg !transition-colors" : ""}
                                    `}
                                >
                                    <div className="flex justifty-left items-center">
                                        <div className="mr-2 p-[0.25rem]">
                                            {React.createElement(item.icon, {
                                                className: `${
                                                    item.url ===
                                                    pathname.pathname
                                                        ? "!fill-current !text-sb-tb !transition-colors"
                                                        : "!fill-current !text-sb-t !transition-colors"
                                                }`,
                                                fill: ""
                                            })}
                                        </div>
                                        <span className="text-sm">
                                            {item.title}
                                        </span>
                                    </div>
                                </li>
                                {item.br && (
                                    <div
                                        className={`mx-[1rem] ${shouldRemovePaddingAndMargin ? "border-0" : "border-b-2"} border-gray-200`}
                                    ></div>
                                )}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
