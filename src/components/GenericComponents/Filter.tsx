import { useState } from "react";
import filterLight from "@assets/icons/Filter.png";
import filterDark from "@assets/icons/Filter-dark.png";
import { FilterProperties } from "@constants/FilterProperties.ts";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import React from "react";

export default function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    function toggleFilter() {
        setIsOpen(!isOpen);
    }
    const isDarkTheme = useThemeDetector();

    return (
        <div className="grid justify-items-end static">
            <button
                onClick={toggleFilter}
                className="h-[56px] w-[56px] rounded-full"
            >
                <img
                    width={"40px"}
                    src={isDarkTheme ? filterDark : filterLight}
                    alt="filter image"
                />
            </button>

            {isOpen && (
                <div
                    className={`${isDarkTheme ? "bg-[#0F1820]" : "bg-white"} absolute rounded-xl p-4 mt-14 flex flex-col text-wrap break-words xl:flex-row justify-between`}
                    style={{
                        position: "absolute",
                        zIndex: 10,
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {FilterProperties.map((filter, index) => (
                        <React.Fragment key={"filter " + index}>
                            <div>
                                <h1 className="text-lg font-bold mb-2">
                                    {filter.title}
                                </h1>
                                {filter.checkboxText.map((checkbox, index) => (
                                    <label
                                        key={"checkbox " + index}
                                        htmlFor={checkbox}
                                        className="block mb-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            id={checkbox}
                                            className="mr-2 cursor-pointer"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        {checkbox}
                                    </label>
                                ))}
                            </div>
                            {index !== FilterProperties.length - 1 && (
                                <div
                                    className={"border-r-2 mx-1 rounded-full"}
                                ></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}
