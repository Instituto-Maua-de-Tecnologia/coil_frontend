import { useThemeDetector } from "@util/ThemeDetector";
import { useEffect, useState } from "react";

export type SelectOption = {
    label: string;
    value: string | number;
};

type MultipleSelectProps = {
    multiple: true;
    value: SelectOption[];
    onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
    multiple?: false;
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({
    multiple,
    value,
    onChange,
    options
}: SelectProps) {
    const [showingOptions, setShowingOptions] = useState(false);
    const [highlitedIndex, setHighlightedIndex] = useState(0);

    const isDarkTheme = useThemeDetector();

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined);
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter((o) => o !== option));
            } else {
                if (!value.some((o) => o.label == option.label)) {
                    onChange([...value, option]);
                }
            }
        } else {
            if (option !== value) onChange(option);
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple
            ? value.includes(option)
            : option.value === value?.value;
    }

    useEffect(() => {
        if (showingOptions) setHighlightedIndex(0);
    }, [showingOptions]);

    return (
        <div
            onBlur={() => setShowingOptions(false)}
            onClick={() => setShowingOptions(!showingOptions)}
            tabIndex={0}
            className={`relative w-full min-h-[1.5em] flex items-center gap-[.5em] p-[.5em] rounded-3xl ${isDarkTheme ? "bg-[#223A4F]" : "bg-[#CBD0DD]"}`}
        >
            <span className="flex-grow flex gap-[.5em] flex-wrap px-4">
                {multiple
                    ? value.map((v) => (
                          <button
                              className="flex items-center bg-[#673366] rounded-3xl py-[.25em] px-4 gap-[.5em] z-[100] hover:bg-[#532352]"
                              key={v.value}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  selectOption(v);
                              }}
                          >
                              {v.label}
                              <span>&times;</span>
                          </button>
                      ))
                    : value?.label}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    clearOptions();
                    setShowingOptions(false);
                }}
                className="text-[#FFFFFF] hover:text-[#2684FF] focus:text-[#2684FF] text-xl"
            >
                &times;
            </button>
            <div className="bg-[#14222E] self-stretch w-[.05em]"></div>
            <div
                className="border-transparent border-t-[#FFFFFF] border-[.25em] border-solid"
                style={{}}
            ></div>
            <div
                className={
                    (showingOptions
                        ? "block focus:border-2 focus:border-[#2684FF]"
                        : "hidden") +
                    (isDarkTheme ? " absolute bg-[#223A4F]" : " bg-[#CBD0DD]") +
                    " rounded-3xl w-full left-0 top-[100%] z-[99] p-4"
                }
            >
                <ul className="overflow-y-auto max-h-[15em]">
                    {options.map((option, index) => (
                        <li
                            onClick={(e) => {
                                e.stopPropagation();
                                selectOption(option);
                                setShowingOptions(false);
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={`px-[.25em] pl-4 py-[.5em] cursor-pointer rounded-l-3xl ${index === highlitedIndex ? "bg-[#14222E]" : ""} ${isOptionSelected(option) ? "bg-[#2684FF]" : ""}`}
                            key={index}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
