import SVGIcon from "../ImageInstances/SVGIcon";
import { countryCodes, Enrolled } from "../../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";

interface EnrolledCardProps {
    enrolled: Enrolled;
}

export default function EnrolledCard({ enrolled }: EnrolledCardProps) {
    const { title, applications, languages, partner_institutions } = enrolled;
    function getCountryFullName(codes: string[]): string {
        const countryNames = codes.map((code) => {
            const normalizedCode = code.toLowerCase();
            return countryCodes[normalizedCode] || "Country not found";
        });
        return countryNames.join(", ");
    }
    const country = partner_institutions?.map(
        (fds) => fds.institution?.country
    );
    const countryName = getCountryFullName(
        enrolled.partner_institutions?.map(
            (fds) => fds.institution?.country
        ) as string[]
    );
    const status = applications?.map((fds) => fds.status);
    const avatarUrl = partner_institutions?.flatMap((fds) =>
        fds.institution?.images.map((img) => img.image)
    )[0];

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
                                {languages
                                    ?.map((fds) => fds.language)
                                    .map((language, index) => (
                                        <SVGIcon
                                            key={
                                                "EnrolledCard SVGIcon " + index
                                            }
                                            src={`https://hatscripts.github.io/circle-flags/flags/${language}.svg`}
                                            className="w-4 m-[1px]"
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row w-full sm:justify-start justify-center">
                                <p className="text-xs mr-2">{country}</p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${countryName}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex sm:absolute sm:right-0 items-center gap-4 flex-col sm:justify-end mr-2">
                        <div
                            className={` ${status ? "text-green-500" : "text-red-500"}`}
                        >
                            {status}
                        </div>
                        <div className="border-2 border-blue-500 text-blue-500 text-sm px-4 py-2 rounded-full">
                            Enrolled
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
