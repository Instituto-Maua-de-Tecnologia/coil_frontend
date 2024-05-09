import { useEffect, useState } from "react";
import Search from "../GenericComponents/Search.tsx";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import Add from "../GenericComponents/Add.tsx";
import getAllInstitutions from "@integrations/institution/get_all_institution.ts";
import InstitutionCard from "@components/Institution/InstitutionCard.tsx";
import { useNavigate } from "react-router-dom";

export interface AllInstitutions {
    id: string;
    name: string;
    logo: string;
    country: string;
} // TODO: Esperar o backend terminar de implementar a lógica de colocar os países para serem exibidos aqui também

interface InstitutionListProps {
    isAdmin: boolean;
}

export default function InstitutionList({ isAdmin }: InstitutionListProps) {
    const [filteredInstitutions, setFilteredInstitutions] = useState<
        AllInstitutions[]
    >([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const institutionsData = await getAllInstitutions();
                setFilteredInstitutions(institutionsData as AllInstitutions[]);
            } catch (error) {
                console.error("Error fetching institutions:", error);
            }
        }

        fetchData();
    }, []);

    const handleSearch = (searchTerm: string) => {
        const filtered = filteredInstitutions.filter((institution) =>
            institution.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInstitutions(filtered);
        //TODO: melhorar a lógica de pesquisa, pois quando se pesquisa por uma instituição existe, e apagar o texto do input, as instituições não voltam a aparecer
    };

    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();

    return (
        <div
            className={`w-full lg:ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
                <div className="button-container flex absolute right-12">
                    {isAdmin ? <Add url="/CreateInstitution" /> : null}
                </div>
            </div>
            {filteredInstitutions.length > 0 ? (
                <ul
                    onClick={() => navigate("/InstitutionInfo")}
                    className="w-full cursor-pointer max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto"
                >
                    {filteredInstitutions.map((institution) => (
                        <InstitutionCard
                            key={institution.id}
                            institution={institution}
                        />
                    ))}
                </ul>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No institutions matched the search criteria
                </p>
            )}
        </div>
    );
}
