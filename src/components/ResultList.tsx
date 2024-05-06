import { useState } from "react";
import ResultCard from "./ResultCard";
import Search from "./Search";
import { Result } from "../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";

interface ResultListProps {
    results: Result[];
}
export default function ResultList({ results }: ResultListProps) {
    const [filteredResults, setFilteredResults] = useState<Result[]>(results);

    const handleSearch = (searchTerm: string) => {
        const filtered = results.filter(
            (result) =>
                result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                result.partnerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                result.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResults(filtered);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
            </div>
            {filteredResults.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {filteredResults.map((result) => (
                            <ResultCard key={result.id} result={result} />
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No result matched the search criteria
                </p>
            )}
        </div>
    );
}
