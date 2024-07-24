import SVGIcon from "../ImageInstances/SVGIcon";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import IResults from "@interfaces/results/IResults.ts";

interface ResultCardProps {
    result: IResults;
}

export default function ResultCard({ result }: ResultCardProps) {
    const { title, applicants, partner_institutions } = result;
    const isDarkTheme = useThemeDetector();
    const institution_images = partner_institutions?.map(
        (institution) => institution.images[0]
    );

    return (
        <li
            className={`sm:flex shadow-sm items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    {institution_images?.map((institution_image, index) => (
                        <div
                            key={"InstitutionImage: " + index}
                            className="sm:avatar-wrapper sm:flex flex-col mr-4"
                        >
                            <img
                                src={institution_image}
                                alt="institution image"
                                className="oject-contain shadow-lg mt-1 mb-2 mx-auto max-w-32 sm:max-w-24 rounded-full"
                            />
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <div className="inline-flex flex-row mb-2 text-center sm:text-start font-bold w-full justify-center sm:justify-normal">
                            {title}
                            <div
                                title={
                                    result.type_activity === 1
                                        ? "COIL"
                                        : "Mobility"
                                }
                                className={`w-auto flex min-h-10 max-h-10 shadow  sm:h-full justify-center items-center rounded-full p-1 px-2 ml-2 text-xs font-medium ${
                                    result.type_activity === 1
                                        ? `${isDarkTheme ? "bg-blue-50 text-blue-700" : "bg-blue-200 text-blue-700"}`
                                        : "bg-yellow-50 text-yellow-700"
                                }`}
                            >
                                {result.type_activity === 1
                                    ? "COIL"
                                    : "Mobility"}
                            </div>
                        </div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex sm:justify-start justify-center font-medium flex-wrap items-center">
                                <p className="text-xs font-medium mr-2">
                                    Languages:
                                </p>
                                {result.languages?.map((language, index) => (
                                    <SVGIcon
                                        key={"ResultCard SVGIcon " + index}
                                        src={`https://hatscripts.github.io/circle-flags/flags/${language.language_code}.svg`}
                                        className="w-4 drop-shadow m-[1px]"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row w-full sm:justify-start justify-center">
                                <p className="text-xs font-medium mr-2">
                                    {
                                        partner_institutions?.[0].countries[0]
                                            .country.country
                                    }
                                </p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${partner_institutions?.[0].countries[0].country.country_code}.svg`}
                                    className="w-4 drop-shadow m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex sm:absolute sm:right-0 items-center gap-4 flex-col sm:justify-end mr-2">
                        {applicants?.map((applicant, index) => (
                            <div
                                key={"ApplicantKey " + index}
                                className={`shadow font-medium ${applicant.status === true ? (isDarkTheme ? "text-green-400 border-green-400" : "text-green-600 border-green-600") : applicant.status === false ? "text-red-500 border-red-500" : isDarkTheme ? "text-yellow-400 border-yellow-700" : "text-yellow-500 border-yellow-400"} border-2 text-sm px-4 py-2 rounded-full`}
                            >
                                {applicant.status === true
                                    ? "Approved"
                                    : applicant.status === false
                                      ? "Unapproved"
                                      : "Pending"}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    );
}
