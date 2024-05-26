import { useState } from "react";
import ResultCard from "./ResultCard";
import Search from "../GenericComponents/Search";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import { ResultsProps } from "@screens/Results.tsx";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";

interface ResultListProps {
    results: ResultsProps[];
}
export default function ResultList({ results }: ResultListProps) {
    const [filteredResults, setFilteredResults] =
        useState<ResultsProps[]>(results);

    const handleSearch = (searchTerm: string) => {
        const filtered = results.filter(
            (result) =>
                result.title
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                result.partner_institutions
                    ?.map((fds) => fds.name.toLowerCase())
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredResults(filtered);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} disabled={true} />
            </div>
            {filteredResults?.length !== undefined ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {results?.map((result) => (
                            <ResultCard key={result.id} result={result} />
                        ))}
                    </ul>
                </div>
            ) : (
                <NoElementsFound message="No results were found" />
            )}
        </div>
    );
}
