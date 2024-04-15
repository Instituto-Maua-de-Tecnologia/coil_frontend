import { useState, ChangeEvent } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="flex flex-row bg-slate-100 justify-center items-center rounded-full py-1 px-4 my-2 w-80  h-10">
            <IoIosSearch className="fill-gray-400" />
            <input
                className="bg-slate-100 text-black outline-none w-full ml-4"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}
