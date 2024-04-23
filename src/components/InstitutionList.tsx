import { useState } from "react";
import InstitutionCard from "./InstitutionCard";
import Search from "./Search";
import Filter from "./Filter.tsx";
import { Institution } from "../types.ts";

interface InstitutionListProps {
    institutions: Institution[];
}

export default function InstitutionList({
    institutions
}: InstitutionListProps) {
    const [filteredInstitutions, setFilteredInstitutions] =
        useState<Institution[]>(institutions);

    const handleSearch = (searchTerm: string) => {
        const filtered = institutions.filter((institution) =>
            institution.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInstitutions(filtered);
    };

    return (
        <div className="w-full lg:ml-4 px-7 py-4 bg-sb-bg rounded-3xl">
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
                <Filter />
            </div>
            {filteredInstitutions.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 overflow-y-auto">
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
