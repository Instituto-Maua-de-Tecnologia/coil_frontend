import { useState, ChangeEvent } from "react";
import { IoIosSearch } from "react-icons/io";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    disabled: boolean;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`flex ${isDarkTheme ? "bg-[#223A4F]" : "bg-[#F0F3FB]"} justify-center items-center rounded-full py-1 px-4 my-2 w-1/2 sm:w-80 h-10`}
        >
            <IoIosSearch
                className={`${isDarkTheme ? "fill-[#FFFFFF]" : "fill-[#CBD0DD]"}`}
            />
            <input
                className={`${isDarkTheme ? "bg-[#223A4F] text-white" : "bg-[#F0F3FB] text-black"} outline-none w-full ml-4`}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}
