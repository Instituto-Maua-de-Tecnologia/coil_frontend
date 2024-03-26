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
        <div className="flex flex-row bg-white justify-center items-center  focus:outline-none focus:shadow-outline border border-gray-300 rounded-full py-1 px-2 my-2 w-60 appearance-none leading-normal ">
            <input
                className="bg-white text-black outline-none"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
            <IoIosSearch className="fill-black" />
        </div>
    );
}
