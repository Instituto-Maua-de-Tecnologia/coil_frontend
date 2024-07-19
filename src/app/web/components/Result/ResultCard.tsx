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
                        <div className="mb-2 font-bold">{title}</div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-wrap items-center">
                                <p className="text-xs mr-2">Languages:</p>
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
                                <p className="text-xs mr-2">
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
                                className={`shadow ${applicant.status === true ? "text-blue-500 border-blue-500" : "text-red-500 border-red-800"} border-2 text-sm px-4 py-2 rounded-full`}
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
