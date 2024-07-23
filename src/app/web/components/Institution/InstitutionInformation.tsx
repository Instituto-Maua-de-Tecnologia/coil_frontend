import { useThemeDetector } from "@functions/ThemeDetector.ts";
import { useEffect, useState } from "react";
import SVGIcon from "@components/ImageInstances/SVGIcon.tsx";
import getInstitution from "@integrations/institution/get_institution.ts";
import IInstitution from "@interfaces/institution/IInstitution.ts";
import { socialMediaIcons } from "@constants/SocialMediaProperties.ts";
import IUser from "@interfaces/user/IUser.ts";
import ImageWithModal from "@components/Modal/ImageWithModal.tsx";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner.tsx";

interface InstitutionInfoProps {
    id: string;
}

export default function InstitutionInformation({ id }: InstitutionInfoProps) {
    const [institution, setInstitution] = useState<IInstitution>();
    const [loaded, setLoaded] = useState(false);

    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        const handleGetInstitution = async () => {
            localStorage.setItem("institution_id", id);
            const idCached = localStorage.getItem("institution_id") as string;
            try {
                const institutionValue = (await getInstitution({
                    institution_id: idCached !== "" ? idCached : id
                })) as IInstitution;
                setInstitution(institutionValue);
                setLoaded(true);
            } catch (error) {
                console.error("Erro ao obter Instituição:", error);
            }
        };
        void handleGetInstitution();
    }, [id]);

    return (
        <>
            {loaded ? (
                <div className="custom-scrollbar overflow-y-auto lg:overflow-y-visible flex-col w-full m-3 mb-0 mt-0 ">
                    <div
                        className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
                    >
                        <div className="self-center p-2 sm:w-1/6">
                            <img
                                src={institution?.images[0]}
                                alt="institution-img"
                                className="max-w-40 shadow-lg sm:max-w-36 mx-auto sm:-mx-auto object-contain rounded-full "
                            />
                        </div>
                        <div className="2xs:text-center sm:ms-14 md:ms-8 lg:ms-6 sm:text-left self-center p-2 sm:w-4/6">
                            <div className="font-extrabold">
                                {institution?.name}
                            </div>
                            <a
                                href={`mailto:${institution?.email}`}
                                className="text-blue-500 underline font-semibold cursor-pointer"
                            >
                                {institution?.email}
                            </a>
                            <div className="flex justify-center sm:justify-start flex-row items-center">
                                <p className="text-xs font-medium mr-2">
                                    {institution?.countries[0].country.country}
                                </p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${institution?.countries[0].country.country_code}.svg`}
                                    className="w-4 drop-shadow m-[1px]"
                                />
                            </div>
                        </div>
                        <div className="sm:text-left mt-16 text-center place-content-center xs:place-items-end pl-10 md:pl-0 pr-10 md:pr-1">
                            <p className={"font-medium"}>social media:</p>
                            <div className="flex justify-center flex-wrap sm:flex-row gap-3">
                                {institution?.social_medias.map(
                                    (social_media, index) => (
                                        <a
                                            key={
                                                "Institution Social Media Key " +
                                                index
                                            }
                                            href={social_media.link}
                                            className="text-blue-500 underline"
                                        >
                                            <img
                                                className="w-6 object-contain drop-shadow h-6"
                                                src={
                                                    socialMediaIcons[
                                                        social_media.media.social_media.toLowerCase()
                                                    ]
                                                }
                                                alt={
                                                    social_media.media
                                                        .social_media
                                                }
                                            />
                                        </a>
                                    )
                                )}
                            </div>
                            <div className="flex justify-start mt-16">
                                {(JSON.parse(
                                    localStorage.getItem("user") as string
                                ) as IUser["user_type"]) === 3 ? (
                                    <button className="bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 text-white text-sm px-4 py-2 rounded-full">
                                        Edit Institution
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:flex w-full md:h-3/4">
                        <div
                            className={` justify rounded-3xl p-4 md:pb-20 pb-0 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:w-1/3 md:mr-2`}
                        >
                            <div className="p-3 font-extrabold ">
                                Institution information
                            </div>
                            <div className="custom-scrollbar overflow-y-auto  h-full p-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed eleifend vestibulum urna,
                                eget sollicitudin tortor fringilla eget. Fusce
                                sit amet elit vitae libero scelerisque
                                venenatis. Vestibulum nec vestibulum leo. Nulla
                                facilisi. Phasellus non hendrerit ante, a
                                pulvinar nibh. Vivamus eget libero euismod,
                                blandit ex vel, cursus odio. Integer nec nulla
                                quis felis rutrum eleifend non a nisi. Maecenas
                                quis tellus quis purus sodales lobortis. Sed et
                                justo vitae magna viverra varius. Phasellus
                                interdum, magna et cursus bibendum, velit arcu
                                viverra justo, id vehicula arcu dui vel mi. Ut
                                eu est felis. Cras id leo nec nulla dapibus
                                posuere. Nullam ac est vitae eros dictum
                                fermentum id et libero. Aliquam ac odio
                                eleifend, fringilla elit non, facilisis risus.
                            </div>
                        </div>
                        <div
                            className={` justify rounded-3xl p-4 pb-0 md:pb-20 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-2/3 md:ml-2`}
                        >
                            <div className="p-3 font-extrabold">
                                Institution pictures
                            </div>
                            <div className="custom-scrollbar flex flex-wrap gap-6 pb-32 overflow-auto h-full p-3">
                                {institution?.images.map((image, index) => (
                                    <ImageWithModal
                                        key={"Institution image: " + index}
                                        image={image}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex w-screen h-screen justify-center items-center">
                    <LoadSpinner />
                </div>
            )}
        </>
    );
}
