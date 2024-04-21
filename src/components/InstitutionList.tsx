import { useState } from "react";
import InstitutionCard from "./InstitutionCard";
import Search from "./Search";
import Fontys from "@assets/fontys.jpg";
import Filter from "./Filter.tsx";

type Institution = {
    id: number;
    avatarUrl: string;
    name: string;
    email: string;
    country: string;
    website: string;
};

export default function InstitutionList() {
    const institutions: Institution[] = [
        {
            id: 1,
            avatarUrl: Fontys,
            name: "Fontys University of Applied Sciences",
            website: "fontys.com.nl",
            email: "fontys@edu.nl",
            country: "nl"
        },
        {
            id: 2,
            avatarUrl: Fontys,
            name: "Fontys University of Applied Sciences",
            website: "fontys.com.nl",
            email: "fontys@edu.nl",
            country: "nl"
        }
    ];
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
                <ul className="w-full max-h-screen pb-48 pe-5 overflow-y-auto">
                    {filteredInstitutions.map((institution) => (
                        <InstitutionCard
                            key={institution.id}
                            institution={institution}
                        />
                    ))}
                </ul>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No Institution matched the search criteria
                </p>
            )}
        </div>
    );
}
