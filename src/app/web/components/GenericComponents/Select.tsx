import { useThemeDetector } from "@functions/ThemeDetector.ts";
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
            className={`relative w-full min-h-[1.5em] flex items-center focus:outline focus:outline-2 focus:outline-[#2684FF] gap-[.5em] p-[.5em] rounded-3xl ${isDarkTheme ? "bg-[#223A4F]" : "bg-[#CBD0DD]"}`}
        >
            <span
                className={`flex-grow flex gap-[.5em] flex-wrap px-4 ${multiple ? "font-bold" : "font-normal text-[#0F1820]"}`}
            >
                {multiple ? (
                    value.length > 0 ? (
                        value.map((v) => (
                            <button
                                className="flex items-center bg-[#673366] rounded-3xl py-[.25em] px-4 gap-[.5em] hover:bg-[#DC143C]"
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
                    ) : (
                        <span
                            className={`font-normal ${isDarkTheme ? "text-[#CBD0DD]" : "text-[#0F1820]"}`}
                        >
                            Select...
                        </span>
                    )
                ) : value != undefined ? (
                    value?.label
                ) : (
                    "Type..."
                )}
            </span>
            <div className="flex gap-2">
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
                    className="border-transparent border-t-[#FFFFFF] border-[.25em] border-solid translate-y-3"
                    style={{}}
                ></div>
            </div>

            <div
                className={
                    (showingOptions
                        ? "block border-2 border-[#2684FF]"
                        : "hidden") +
                    (isDarkTheme ? " absolute bg-[#223A4F]" : " bg-[#CBD0DD]") +
                    " rounded-3xl w-full left-0 top-[115%] z-[99] p-4"
                }
            >
                <ul
                    className={`overflow-y-auto ${multiple ? "flex flex-wrap font-bold" : "font-normal"} max-h-[15em]`}
                >
                    {multiple
                        ? options.map((option, index) => (
                              <li
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      selectOption(option);
                                      if (!multiple) {
                                          setShowingOptions(false);
                                      }
                                  }}
                                  onMouseEnter={() =>
                                      setHighlightedIndex(index)
                                  }
                                  className={`${value.some((o) => o.label == option.label) ? "hidden" : "block"} bg-[#673366] hover:bg-[#532352] py-[.25em] px-4 m-1 cursor-pointer rounded-3xl ${index === highlitedIndex ? "bg-[#14222E]" : ""} ${isOptionSelected(option) ? "bg-[#2684FF]" : ""}`}
                                  key={option.value}
                              >
                                  {option.label}
                              </li>
                          ))
                        : options.map((option, index) => (
                              <li
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      selectOption(option);
                                      setShowingOptions(false);
                                  }}
                                  onMouseEnter={() =>
                                      setHighlightedIndex(index)
                                  }
                                  className={`${value === option ? "hidden" : "block"} px-[.25em] pl-4 py-[.5em] cursor-pointer rounded-3xl ${index === highlitedIndex ? "bg-[#14222E]" : ""} ${isOptionSelected(option) ? "bg-[#2684FF]" : ""}`}
                                  key={option.value}
                              >
                                  {option.label}
                              </li>
                          ))}
                </ul>
            </div>
        </div>
    );
}
