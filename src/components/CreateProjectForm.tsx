import Select, { StylesConfig } from "react-select";
import TrashButton from "./TrashButton";
import DropdownIndicator from "./DropdownIndicator";
import React, { useState } from "react";
import { useThemeDetector } from "@util/ThemeDetector";

const langOptions = [
    { value: "portuguese", label: "Portuguese" },
    { value: "english", label: "English" },
    { value: "dutch", label: "Dutch" }
];

const courseOptions = [{ value: "computerScience", label: "Computer Science" }];

const partnerInstitutionOptions = [
    { value: "fontys", label: "Fontys University of Applied Sciences" },
    { value: "maua", label: "Instituto Mauá de Tecnologia" }
];

const projectStatusOptions = [
    { value: "to_start", label: "To Start" },
    { value: "active", label: "Open" },
    { value: "on_hold", label: "On Hold" },
    { value: "ended", label: "Closed" },
    { value: "cancelled", label: "Cancelled" }
];

const CreateProjectForm: React.FC = () => {
    const isDarkTheme = useThemeDetector();

    const inputStyle = {
        backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
        placeholderColor: isDarkTheme ? "#0F1820" : "CBD0DD",
        border: "none",
        borderRadius: "30px",
        padding: "9px 12px",
        outline: "none"
    };

    const textAreaStyle = {
        backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
        border: "none",
        borderRadius: "18px",
        padding: "8px 12px",
        outline: "none",
        resize: "none"
    };

    const multiStyle: StylesConfig = {
        control: (provided) => ({
            ...provided,
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            border: "none",
            boxShadow: "none",
            borderRadius: "30px"
        }),
        menu: () => ({
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            padding: "8px",
            borderRadius: "30px",
            boxShadow: "0 0 2px #1D232C50"
        }),
        option: (provided, state) => ({
            ...provided,
            margin: "0px 0px 8px 0px",
            maxWidth: "240px",
            width: "100%",
            color: "#FFFFFF",
            borderRadius: "30px",
            backgroundColor: state.isFocused ? "#673366" : "#512650",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }),
        multiValue: (provided) => ({
            ...provided,
            color: "#FFFFFF",
            padding: "1px 4px",
            borderRadius: "30px",
            backgroundColor: "#673366",
            maxWidth: "240px",
            fontSize: "20px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "#FFFFFF"
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "#FFFFFF",
            ":hover": {
                backgroundColor: "transparent"
            }
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#FFFFFF" : "#1D232C"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#0F1820" : "#CBD0DD"
        })
    };

    const singleStyle: StylesConfig = {
        control: (provided) => ({
            ...provided,
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            border: "none",
            boxShadow: "none",
            borderRadius: "30px"
        }),
        menu: () => ({
            backgroundColor: isDarkTheme ? "#223A4F" : "#F0F3FB",
            padding: "8px",
            borderRadius: "30px",
            boxShadow: "0 0 2px #1D232C50"
        }),
        option: (provided) => ({
            ...provided,
            margin: "0px 0px 8px 0px",
            width: "100%",
            background: "transparent",
            color: isDarkTheme ? "#FFFFFF" : "#1D232C",
            whiteSpace: "nowrap",
            overflow: "hidden",
            borderRadius: "30px",
            textOverflow: "ellipsis"
        }),
        singleValue: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#FFFFFF" : "#1D232C",
            width: "100%",
            background: "transparent",
            padding: "4px 12px",
            borderRadius: "30px"
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            fill: "#FFFFFF"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: isDarkTheme ? "#0F1820" : "#CBD0DD"
        })
    };

    const [criterias, setCriterias] = useState<string[]>([""]);

    const handleAddCriteria = () => {
        setCriterias([...criterias, ""]);
    };

    const handleRemoveCriteria = (index: number) => {
        const newCriterias = [...criterias];
        newCriterias.splice(index, 1);
        setCriterias(newCriterias);
    };

    return (
        <div
            className={`w-full md:ml-4 px-4 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl overflow-auto`}
        >
            <div className="form [font-family:'Inter',Helvetica] font-semibold space-y-2">
                <div className="form-row-1 flex flex-col mx-2 max-w-[49%] min-w-[420px] space-y-2">
                    <label htmlFor="projectName">Project Name</label>
                    <input
                        className={`placeholder:text-[${inputStyle["placeholderColor"]}]`}
                        type="text"
                        placeholder="Type the name..."
                        style={inputStyle}
                    />
                </div>
                <div className="form-row-2 md:flex min-w-[320px]">
                    <div className="langMultiSelect flex flex-col mx-2 w-full space-y-2">
                        <label htmlFor="languages">Languages</label>
                        <Select
                            isMulti
                            options={langOptions}
                            menuPosition="fixed"
                            components={{
                                IndicatorSeparator: () => null,
                                DropdownIndicator: () => <DropdownIndicator />
                            }}
                            styles={multiStyle}
                        />
                    </div>
                    <div className="courseMultiSelect flex flex-col w-full mx-2 space-y-2">
                        <label htmlFor="selectableCourses">
                            Selectable Courses
                        </label>
                        <Select
                            isMulti
                            menuPosition="fixed"
                            isClearable={true}
                            isSearchable={true}
                            styles={multiStyle}
                            components={{
                                IndicatorSeparator: () => null,
                                DropdownIndicator: () => <DropdownIndicator />
                            }}
                            options={courseOptions}
                        />
                    </div>
                </div>
                <div className="form-row-3 md:flex min-w-[320px]">
                    <div className="form-row-3-1 flex w-full min-w-[50%]">
                        <div className="partner-institution-select w-full mx-2 space-y-2">
                            <label htmlFor="partnerInstitution">
                                Partner Institution
                            </label>
                            <Select
                                options={partnerInstitutionOptions}
                                menuPosition="fixed"
                                components={{
                                    IndicatorSeparator: () => null,
                                    DropdownIndicator: () => (
                                        <DropdownIndicator />
                                    )
                                }}
                                styles={singleStyle}
                            />
                        </div>
                        <div className="project-status-select  w-full mx-2 space-y-2">
                            <label htmlFor="partnerInstitution">
                                Project Status
                            </label>
                            <Select
                                options={projectStatusOptions}
                                menuPosition="fixed"
                                components={{
                                    IndicatorSeparator: () => null,
                                    DropdownIndicator: () => (
                                        <DropdownIndicator />
                                    )
                                }}
                                styles={singleStyle}
                            />
                        </div>
                    </div>
                    <div className="form-row-3-2 md:flex w-full">
                        <div className="application-start-date flex flex-col mx-2 space-y-2 w-full">
                            <label htmlFor="applicationStartDate">
                                Aplication Start Date
                            </label>
                            <input
                                className={`placeholder:text-[${inputStyle["placeholderColor"]}]`}
                                type="text"
                                placeholder="XX/XX/XXXX"
                                style={inputStyle}
                            />
                        </div>
                        <span className="arrow pt-10">{">"}</span>
                        <div className="application-end-date flex flex-col mx-2 space-y-2 w-full">
                            <label htmlFor="applicationEndDate">
                                Aplication End Date
                            </label>
                            <input
                                className={`placeholder:text-[${inputStyle["placeholderColor"]}]`}
                                type="text"
                                placeholder="XX/XX/XXXX"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row-4 md:flex">
                    <div className="project-description flex flex-col w-full mx-2 space-y-2">
                        <label htmlFor="projectDescription">
                            Project Description
                        </label>
                        <textarea
                            className={`mt-2 placeholder:text-[${inputStyle["placeholderColor"]}]`}
                            placeholder="Type the description..."
                            rows={18}
                            style={textAreaStyle}
                        />
                    </div>
                    <div className="project-criteria mx-2 space-y-2 w-full">
                        <label htmlFor="projectCriteria">
                            Project Criteria
                        </label>
                        <ul className="overflow-auto w-max-[460px]">
                            {criterias.map((c, index) => (
                                <li
                                    key={index}
                                    className={`${c}      criteria-item flex items-center mt-1 mb-3`}
                                >
                                    <TrashButton
                                        onRemoveCriteria={() => {
                                            handleRemoveCriteria(index);
                                        }}
                                    />
                                    <input
                                        className={`w-full placeholder:text-[${inputStyle["placeholderColor"]}]`}
                                        type="text"
                                        placeholder="Type your criteria..."
                                        style={inputStyle}
                                    />
                                </li>
                            ))}
                            <button
                                onClick={handleAddCriteria}
                                className="add-criteria text-[#2684FF] text-semibold"
                            >
                                + Add Criteria
                            </button>
                        </ul>
                    </div>
                </div>
                <div className="button-row flex">
                    <div className="w-full"></div>
                    <button className="confirm text-white px-4 p-2 bg-[#2684ff] rounded-3xl">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectForm;
