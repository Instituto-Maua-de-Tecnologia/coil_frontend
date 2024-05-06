import SVGIcon from "./SVGIcon";
import { countryCodes, Institution } from "../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface InstitutionCardProps {
    institution: Institution;
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
    const { avatarUrl, name, country } = institution;
    function getCountryFullName(code: string): string {
        const countryCode = code.toLowerCase();
        return countryCodes[countryCode] || "Country not found";
    }
    const countryName = getCountryFullName(institution.country);
    const isDarkTheme = useThemeDetector();

    return (
        <li
            className={`sm:flex items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full sm:min-h-20">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar-img mx-auto w-16 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2 font-bold">{name}</div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">{countryName}</p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country}.svg`}
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
