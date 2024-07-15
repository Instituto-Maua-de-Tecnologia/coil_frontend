import { useThemeDetector } from "@functions/ThemeDetector.ts";
import IAllInstitutions from "@interfaces/institution/IAllInstitutions.ts";
import SVGIcon from "@components/ImageInstances/SVGIcon.tsx";
import { useNavigate } from "react-router-dom";
import getInstitutionsRequirements from "@integrations/institution/admin&moderator/get_institutions_requirements.ts";
import { useEffect, useState } from "react";
import IRequirementsProps from "@interfaces/requirements/IRequirementsProps.ts";

export default function InstitutionCard({ logo, name, id }: IAllInstitutions) {
    const [country, setCountry] = useState<IRequirementsProps>();
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    const handleGetInstitutionRequirements = async () => {
        try {
            const requirementsValues =
                (await getInstitutionsRequirements()) as IRequirementsProps;
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
