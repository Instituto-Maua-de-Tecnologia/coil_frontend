import { useState } from "react";
import ResultCard from "./ResultCard";
import Search from "../GenericComponents/Search";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import IResults from "@interfaces/results/IResults.ts";

interface IResultsProps {
    results: IResults[];
}

export default function ResultList({ results }: IResultsProps) {
    const [filteredResults, setFilteredResults] = useState<IResults[]>(results);

    const handleSearch = (searchTerm: string) => {
        const filtered = results.filter(
            (result) =>
                result.title
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                result.partner_institutions?.[0]?.name
                    .toLowerCase()
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
            {filteredResults?.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {results?.map((result, index) => (
                            <>
                                {results.length === index + 1 ? (
                                    <div className={"sm:mb-96"}>
                                        <ResultCard
                                            key={result.id as string}
                                            result={result}
                                        />
                                    </div>
                                ) : (
                                    <ResultCard
                                        key={result.id as string}
                                        result={result}
                                    />
                                )}
                            </>
                        ))}
                    </ul>
                </div>
            ) : (
                <NoElementsFound message="No results were found" />
            )}
        </div>
    );
}
