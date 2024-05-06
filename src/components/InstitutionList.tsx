import { useState } from "react";
import InstitutionCard from "./InstitutionCard";
import Search from "./Search";
import { Institution } from "../types.ts";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";
import Add from "./Add.tsx";

interface InstitutionListProps {
    institutions: Institution[];
    isAdmin: boolean;
}

export default function InstitutionList({
    institutions,
    isAdmin
}: InstitutionListProps) {
    const [filteredInstitutions, setFilteredInstitutions] =
        useState<Institution[]>(institutions);

    const handleSearch = (searchTerm: string) => {
        const filtered = institutions.filter((institution) =>
            institution.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInstitutions(filtered);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full lg:ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
                <div className="button-container flex absolute right-12">
                    {isAdmin ? <Add /> : null}
                </div>
            </div>
            {filteredInstitutions.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {filteredInstitutions.map((institution) => (
                            <InstitutionCard
                                key={institution.id}
                                institution={institution}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No Institution matched the search criteria
                </p>
            )}
        </div>
    );
}
