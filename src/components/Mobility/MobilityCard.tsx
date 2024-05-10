import SVGIcon from "../ImageInstances/SVGIcon";
import { countryCodes, Mobility } from "../../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface MobilityCardProps {
    mobility: Mobility;
    enrolled: boolean;
    onClick: (mobility: Mobility) => void;
}

export default function MobilityCard({
    mobility,
    onClick,
    enrolled
}: MobilityCardProps) {
    function getCountryFullName(codes: string[]): string {
        const countryNames = codes.map((code) => {
            const normalizedCode = code.toLowerCase();
            return countryCodes[normalizedCode] || "Country not found";
        });
        return countryNames.join(", ");
    }
    const countryCodesArray = mobility.languages.map((fds) => fds.language);
    const countryInstitutionArray = mobility.partner_institutions.map(
        (fds) => fds.institution.country
    );
    const country = getCountryFullName(countryInstitutionArray);
    const countryName = getCountryFullName(countryCodesArray);

    const handleOnClick = () => {
        onClick(mobility);
    };
    const isDarkTheme = useThemeDetector();
    return (
        <li
            className={`sm:flex items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                        <img
                            src={
                                mobility.partner_institutions[0].institution
                                    .images[0].image
                            }
                            alt="Avatar"
                            className="avatar-img mx-auto w-16 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2 font-bold">{mobility.title}</div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">Languages:</p>
                                {mobility.languages.map((language, index) => (
                                    <>
                                        <p
                                            className={"text-xs"}
                                            key={
                                                "MobilityCard SVGIcon " + index
                                            }
                                        >
                                            {" "}
                                            {language.language}
                                        </p>
                                        <SVGIcon
                                            src={`https://hatscripts.github.io/circle-flags/flags/${countryName.substring(0, 2)}.svg`}
                                            className="w-4 m-[1px]"
                                        />
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row w-full sm:justify-start justify-center">
                                <p className="text-xs mr-2">
                                    {
                                        mobility.partner_institutions[0]
                                            .institution.country
                                    }
                                </p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country.substring(0, 2)}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex sm:absolute sm:right-0 items-center gap-4 flex-col sm:justify-end mr-2">
                        <div className={`text-blue-500`}>
                            {mobility.activity_status.name.replace("_", " ")}
                        </div>
                        <button
                            onClick={handleOnClick}
                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                        >
                            {enrolled ? "Disenroll" : "Enroll"}
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
