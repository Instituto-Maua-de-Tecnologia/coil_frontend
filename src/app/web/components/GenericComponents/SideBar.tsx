import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navigation } from "@constants/SideBarProperties.ts";
import darkMauaLogo from "@assets/maua-fontys-dark.svg";
import lightMauaLogo from "@assets/maua-fontys-light.svg";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import IUser from "@interfaces/user/IUser.ts";
import getUserName from "@functions/getUserName.ts";

export default function SideBar() {
    const userToken = (
        JSON.parse(localStorage.getItem("user") as string) as IUser
    )?.user_type;
    const access = userToken === 1 ? 1 : 2;
    const isDarkTheme = useThemeDetector();
    const pathname = useLocation();

    useEffect(() => {
        getUserName();
    }, []);

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
                className={`lg:block relative hidden w-[13rem] ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
            >
                <div
                    className={`flex flex-col ${shouldRemovePaddingAndMargin ? "pt-0" : "pt-[2vh]"} items-center justify-center`}
                >
                    <img
                        src={isDarkTheme ? lightMauaLogo : darkMauaLogo}
                        alt="COIL logo"
                        width={screenHeight <= 590 ? 100 : 130}
                        height={screenHeight <= 590 ? 100 : 130}
                    />
                    <ul
                        className={`${shouldRemovePaddingAndMargin ? "pt-0" : "pt-[2vh]"} w-full pointer-events-auto`}
                    >
                        {navigation.map((item, index) =>
                            item.access == undefined ? (
                                <a key={"SideBar " + index} href={item.url}>
                                    <li
                                        className={`!truncate hover:opacity-80 transition-opacity duration-300 drop-shadow-sm !overflow-ellipsis !whitespace-nowrap !text-nowrap !max-w-full
                                    ${shouldRemovePaddingAndMargin ? "mb-2" : "mb-[1.25vh]"}                              
                                    ${item.gap && `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[5vh]"}`} 
                                    ${item.purple && `!bg-sb-p ${screenHeight >= 700 ? "absolute bottom-0 w-12" : ""} ${shouldRemovePaddingAndMargin ? "mb-0" : "mb-[2vh]"} w-[75%] !text-white hover:opacity-80`}
                                    ${item.blue && `${isDarkTheme ? "!bg-[#223A4F] !text-black" : "!bg-sb-t !text-white"} ${screenHeight >= 700 ? "absolute bottom-14" : ""} hover:opacity-80 w-[75%]`}
                                    ${item.smgap ? `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[2.75vh]"}` : `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[1vh]"}`}
                                    ${item.br ? "-mt-[0.4rem]" : `flex items-center justify-left rounded-3xl p-[1vh] mx-[1.5rem] cursor-pointer ${isDarkTheme ? "bg-[#223A4F]" : "bg-sb-tb"} text-sb-t text-md font-medium hover:opacity-80`}
                                    ${item.url?.replace(/\//g, "") === pathname.pathname.replace(/\//g, "") && !item.purple ? `shadow-lg !fill-current !bg-sb-t ${isDarkTheme ? "!text-[#223A4F]" : "!text-sb-bg"} !ransition-colors` : ""}
                                    ${item.id === "7" ? "!bg-[#2684FF] hover:opacity-80 transition-opacity duration-300 !drop-shadow-md !text-wrap !break-words" /*dark Mode Config*/ : "" /*light Mode Config*/}
                                    `}
                                    >
                                        <div className="flex justifty-left items-center">
                                            <div className="mr-2 p-[0.25rem]">
                                                {React.createElement(
                                                    item.icon,
                                                    {
                                                        className: `${
                                                            item.url ===
                                                            pathname.pathname
                                                                ? `!fill-current ${isDarkTheme ? "!text-[#223A4F]" : "!text-sb-tb"} !transition-colors`
                                                                : "!fill-current !transition-colors"
                                                        }`,
                                                        fill: ""
                                                    }
                                                )}
                                            </div>
                                            <span className="text-sm">
                                                {item.title === "" &&
                                                getUserName() !== null
                                                    ? (
                                                          getUserName() as string
                                                      ).substring(
                                                          0,
                                                          (
                                                              getUserName() as string
                                                          ).indexOf(" ")
                                                      )
                                                    : item.title}
                                            </span>
                                        </div>
                                    </li>
                                    {item.br && (
                                        <div
                                            className={`mx-[1rem] ${isDarkTheme ? "border-[#0F1820]" : "border-gray-200"} ${shouldRemovePaddingAndMargin ? "border-0" : "border-b-2"}`}
                                        ></div>
                                    )}
                                </a>
                            ) : item.access == access ? (
                                <a key={"SideBar " + index} href={item.url}>
                                    <li
                                        className={`!truncate hover:opacity-80 transition-opacity duration-300 drop-shadow-sm !overflow-ellipsis !whitespace-nowrap !text-nowrap !max-w-full
                                    ${shouldRemovePaddingAndMargin ? "mb-2" : "mb-[1.25vh]"}                              
                                    ${item.gap && `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[5vh]"}`} 
                                    ${item.purple && `!bg-sb-p ${screenHeight >= 700 ? "absolute bottom-0 w-12" : ""} ${shouldRemovePaddingAndMargin ? "mb-0" : "mb-[2vh]"} w-[75%] !text-white hover:opacity-80`}
                                    ${item.blue && `${isDarkTheme ? "!bg-[#223A4F] !text-black" : "!bg-sb-t !text-white"} ${screenHeight >= 700 ? "absolute bottom-16" : ""} hover:opacity-80 w-[75%]`}
                                    ${item.smgap ? `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[4vh]"}` : `${shouldRemovePaddingAndMargin ? "mt-0" : "mt-[1vh]"}`}
                                    ${item.br ? "-mt-[0.4rem]" : `flex items-center justify-left rounded-3xl p-[1vh] mx-[1.5rem] cursor-pointer ${isDarkTheme ? "bg-[#223A4F]" : "bg-sb-tb"}  text-sb-t text-md font-medium hover:opacity-80`}
                                    ${item.url === pathname.pathname && !item.purple ? `!fill-current !bg-sb-t ${isDarkTheme ? "!text-[#223A4F]" : "!text-sb-bg"}` : ""}
                                    ${item.id === "7" ? "!bg-[#2684FF] hover:opacity-80 transition-opacity duration-300 !text-wrap !break-words" /*dark Mode Config*/ : "" /*light Mode Config*/}
                                    `}
                                    >
                                        <div className="flex justifty-left items-center">
                                            <div className="mr-2 p-[0.25rem]">
                                                {React.createElement(
                                                    item.icon,
                                                    {
                                                        className: `${
                                                            item.url ===
                                                            pathname.pathname
                                                                ? `!fill-current ${isDarkTheme ? "!text-[#223A4F]" : "!text-sb-tb"} !transition-colors`
                                                                : "!fill-current !transition-colors"
                                                        }`,
                                                        fill: ""
                                                    }
                                                )}
                                            </div>
                                            <span className="text-sm">
                                                {item.title}
                                            </span>
                                        </div>
                                    </li>
                                    {item.br && (
                                        <div
                                            className={`mx-[1rem] ${isDarkTheme ? "border-[#0F1820]" : "border-gray-200"} ${shouldRemovePaddingAndMargin ? "border-0" : "border-b-2"}`}
                                        ></div>
                                    )}
                                </a>
                            ) : null
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
