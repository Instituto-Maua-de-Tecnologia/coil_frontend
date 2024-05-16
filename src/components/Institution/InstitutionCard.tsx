import { useThemeDetector } from "@util/ThemeDetector.ts";
import { AllInstitutions } from "@components/Institution/InstitutionList.tsx";
import SVGIcon from "@components/ImageInstances/SVGIcon.tsx";
import { useNavigate } from "react-router-dom";
import getInstitutionsRequirements from "@integrations/institution/admin&moderator/get_institutions_requirements.ts";
import { useEffect, useState } from "react";

interface InstitutionCardProps {
    institution: AllInstitutions;
}

export interface RequirementsProps {
    courses: [
        {
            id: number;
            course: string;
        }
    ];
    criterias: [
        {
            id: number;
            criteria: string;
        }
    ];
    languages: [
        {
            id: number;
            language: string;
            language_code: string;
        }
    ];
    institutions: [
        {
            id?: string;
            name?: string;
        }
    ];
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
    const [country, setCountry] = useState<RequirementsProps>();
    const { logo, name, id } = institution;
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    const handleGetInstitutionRequirements = async () => {
        try {
            const requirementsValues =
                (await getInstitutionsRequirements()) as RequirementsProps;
            setCountry(requirementsValues);
        } catch (error) {
            console.error("Erro ao obter cursos:", error);
        }
    };

    useEffect(() => {
        handleGetInstitutionRequirements();
    }, []);

    return (
        <li
            onClick={() =>
                navigate("/InstitutionInfo", { state: { institution: id } })
            }
            className={`sm:flex cursor-pointer items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full sm:min-h-20">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                        <img
                            src={logo}
                            alt="Avatar"
                            className="avatar-img mx-auto w-16 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2 font-bold">{name}</div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">
                                    {country?.languages[0].language}
                                </p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country?.languages[0].language_code}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
