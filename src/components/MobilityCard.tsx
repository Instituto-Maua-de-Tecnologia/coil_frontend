import SVGIcon from "./SVGIcon";
import { countryCodes, Mobility } from "../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface MobilityCardProps {
    mobility: Mobility;
    onClick: (mobility: Mobility) => void;
}

export default function MobilityCard({ mobility, onClick }: MobilityCardProps) {
    const { avatarUrl, title, status, languages, country } = mobility;
    function getCountryFullName(code: string): string {
        const countryCode = code.toLowerCase();
        return countryCodes[countryCode] || "Country not found";
    }
    const countryName = getCountryFullName(mobility.country);

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
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar-img mx-auto w-16 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2 font-bold">{title}</div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-row items-center">
                                <p className="text-xs mr-2">Languages:</p>
                                {languages.map((language, index) => (
                                    <SVGIcon
                                        key={"MobilityCard SVGIcon " + index}
                                        src={`https://hatscripts.github.io/circle-flags/flags/${language}.svg`}
                                        className="w-4 m-[1px]"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row w-full sm:justify-start justify-center">
                                <p className="text-xs mr-2">{countryName}</p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${country}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex sm:absolute sm:right-0 items-center gap-4 flex-col sm:justify-end mr-2">
                        <div
                            className={` ${status === "Open" ? "text-green-500" : "text-red-500"}`}
                        >
                            {status}
                        </div>
                        <button
                            onClick={handleOnClick}
                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                        >
                            Enroll
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
