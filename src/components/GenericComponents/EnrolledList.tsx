import { useState } from "react";
import EnrolledCard from "./EnrolledCard.tsx";
import Search from "./Search.tsx";
import { Enrolled } from "../../types.ts";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";

interface EnrolledListProps {
    enrolleds: Enrolled[];
}
export default function EnrolledList({ enrolleds }: EnrolledListProps) {
    const [filteredEnrolleds, setFilteredEnrolleds] =
        useState<Enrolled[]>(enrolleds);

    const handleSearch = (searchTerm: string) => {
        const filtered = enrolleds.filter(
            (enrolled) =>
                enrolled.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                enrolled.partnerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                enrolled.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEnrolleds(filtered);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
            </div>
            {filteredEnrolleds.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {filteredEnrolleds.map((enrolled) => (
                            <EnrolledCard
                                key={enrolled.id}
                                enrolled={enrolled}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No enrolled matched the search criteria
                </p>
            )}
        </div>
    );
}
