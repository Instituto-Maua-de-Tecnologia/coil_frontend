import React, { useEffect, useRef, useState } from "react";
import getInstitutionsRequirements from "@integrations/institution/admin&moderator/get_institutions_requirements.ts";
import IInstitutionRequirements from "@interfaces/institution/IInstitutionRequirements.ts";

import ToasterContainer from "@components/GenericComponents/ToasterContainer.tsx";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import Select, { SelectOption } from "@components/GenericComponents/Select.tsx";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner.tsx";
import {
    FaFacebook,
    FaGlobe,
    FaInstagram,
    FaLinkedin,
    FaYoutube
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import createInstitution from "@integrations/institution/admin&moderator/create_institution.ts";
import getCountryIdByName from "@formatters/formatCountry.ts";
import toast from "react-hot-toast";

// Essa ordem deve ser mantida
const iconMap: Record<string, IconType> = {
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    Twitter: FaXTwitter,
    LinkedIn: FaLinkedin,
    YouTube: FaYoutube,
    Website: FaGlobe
};

export default function CreateInstitutionForm() {
    const [countries, setCountries] = useState<
        IInstitutionRequirements["countries"]
    >([{ id: 0, country: "", country_code: "" }]);
    const [selectedCountries, setSelectedCountries] = useState<SelectOption>();
    const [socialMedias, setSocialMedias] = useState<
        IInstitutionRequirements["social_medias"]
    >([{ id: 0, social_media: "" }]);
    const [selectedSocialMedias, setSelectedSocialMedias] = useState([
        { id: 0, link: "" }
    ]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);

    const institutionNameRef = useRef<HTMLInputElement>(null);
    const institutionEmailRef = useRef<HTMLInputElement>(null);
    const institutionDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const socialMediaRefs = useRef<{ [key: string]: HTMLInputElement | null }>(
        {}
    );

    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllCountriesAndMedia() {
            try {
                const institutionRequirements =
                    (await getInstitutionsRequirements()) as IInstitutionRequirements;
                setCountries(institutionRequirements.countries);
                setSocialMedias(institutionRequirements.social_medias);
                setLoaded(true);
            } catch (error) {
                console.error("Erro ao obter países e social_media:", error);
            }
        }
        void getAllCountriesAndMedia();
    }, []);

    const countriesOption: SelectOption[] = countries.map((country) => ({
        label: country.country,
        value: country.id
    }));

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

            const validFiles = files.filter((file) =>
                validImageTypes.includes(file.type)
            );

            if (validFiles.length < files.length) {
                alert("Alguns arquivos não são válidos e foram ignorados.");
            }

            const fileReaders = validFiles.map((file) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(fileReaders)
                .then((base64Files) => {
                    setImagePreviews((prevPreviews) => [
                        ...prevPreviews,
                        ...base64Files
                    ]);
                })
                .catch((error) => {
                    console.error(
                        "Erro ao converter imagens para base64:",
                        error
                    );
                });
        }
    };

    const removeImage = (index: number) => {
        setImagePreviews((prevPreviews) =>
            prevPreviews.filter((_, i) => i !== index)
        );
    };

    const validateForm = () => {
        const institutionName = institutionNameRef.current?.value.trim() ?? "";
        const institutionEmail =
            institutionEmailRef.current?.value.trim() ?? "";
        const institutionCountry = selectedCountries?.value ?? "";
        const institutionDescription =
            institutionDescriptionRef.current?.value.trim() ?? "";
        setSelectedSocialMedias([]);

        let isValid = true;
        const errors = [];

        if (
            !institutionName ||
            institutionName.length < 5 ||
            /^[0-9!@#$%^&*(),.?":{}|<>]*$/.test(institutionName)
        ) {
            isValid = false;
            errors.push(
                "Institution name must be at least 5 characters long and cannot be empty or contain only numbers or special characters."
            );
        }

        if (!institutionCountry) {
            isValid = false;
            errors.push("Institution country cannot be empty.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!institutionEmail || !emailRegex.test(institutionEmail)) {
            isValid = false;
            errors.push(
                "Institution email must be a valid email address and cannot be empty."
            );
        }

        const regexFacebook = /^https:\/\/(?:www\.)?facebook\.com\/.*$/;
        const regexInstagram = /^https:\/\/(?:www\.)?instagram\.com\/.*$/;
        const regexTwitter = /^https:\/\/(?:www\.)?x\.com\/.*$/;
        const regexYouTube = /^https:\/\/(?:www\.)?youtube\.com\/.*$/;
        const regexLinkedIn = /^https:\/\/(?:www\.)?linkedin\.com\/.*$/;

        const validateSocialMediaUrl = (url: string): boolean => {
            if (url !== "") {
                return (
                    regexFacebook.test(url) ||
                    regexInstagram.test(url) ||
                    regexTwitter.test(url) ||
                    regexYouTube.test(url) ||
                    regexLinkedIn.test(url)
                );
            } else return true;
        };

        if (!institutionDescription) {
            isValid = false;
            errors.push("A descrição do projeto é obrigatória.");
        } else if (
            institutionDescription.length > 1200 ||
            institutionDescription.length < 20
        ) {
            isValid = false;
            errors.push(
                "A descrição do projeto deve ter entre 20 e 1200 caracteres."
            );
        }

        const socialMediaFilled = Object.values(socialMediaRefs.current).some(
            (ref) => ref?.value.trim() !== ""
        );

        if (!socialMediaFilled) {
            isValid = false;
            errors.push("At least one social media URL must be filled.");
        } else {
            Object.entries(socialMediaRefs.current).forEach(
                ([key, ref], index) => {
                    if (
                        ref &&
                        ref.value.trim() !== "" &&
                        !validateSocialMediaUrl(
                            key !== "Website" ? ref.value : ""
                        )
                    ) {
                        isValid = false;
                        errors.push(`Invalid URL for ${key}.`);
                    } else {
                        const teste = [
                            {
                                id: index + 1,
                                link: ref?.value as string
                            }
                        ];
                        setSelectedSocialMedias(
                            selectedSocialMedias.concat(teste)
                        );
                    }
                }
            );
        }

        if (!isValid) {
            alert(errors.join("\n"));
        }

        return isValid;
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setSelectedSocialMedias([]);
        const seen = new Set<number>();
        const novaLista = selectedSocialMedias.filter((item) => {
            if (!seen.has(item.id)) {
                seen.add(item.id);
                return true;
            }
            return false;
        });
        const novaSocial = novaLista.filter((item) => item.id !== 0);
        if (validateForm()) {
            const institutionCountryId = getCountryIdByName(
                selectedCountries?.label ?? ""
            );
            const body = {
                name: institutionNameRef.current?.value as string,
                email: institutionEmailRef.current?.value as string,
                description: institutionDescriptionRef.current?.value as string,
                countries: institutionCountryId ? [institutionCountryId] : [],
                images: imagePreviews,
                social_medias: novaSocial
            };
            await toast
                .promise(createInstitution(body), {
                    loading: `Criando Instituição`,
                    success: <b>Instituição criada com sucesso!</b>,
                    error: (error: Error) => error.message
                })
                .then(() => {
                    navigate("/Institution");
                });
        }
    };

    return (
        <>
            <ToasterContainer />
            {loaded ? (
                <div
                    className={`w-full grid grid-cols-1 sm:grid-cols-3 md:ml-4 px-4 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl overflow-auto`}
                >
                    <div className="col-span-2 flex flex-col mx-2 space-y-2">
                        <label htmlFor="institutionName">
                            Institution Name
                        </label>
                        <input
                            ref={institutionNameRef}
                            className={`${isDarkTheme ? "placeholder:text-[#CBD0DD] outline-[#2684FF] bg-[#223A4F]" : "placeholder:text-[#0F1820] outline-[#73AFFF] bg-[#F0F3FB]"} text-ellipsis shadow-sm focus:outline transition-all duration-75 outline-2 font-normal rounded-3xl min-h-[1.5em] gap-[.5em] p-[.5em] px-6`}
                            type="text"
                            placeholder="Type the name..."
                        />
                        <label htmlFor="country">Institution Country</label>
                        <Select
                            multiple={false}
                            options={countriesOption}
                            value={selectedCountries}
                            onChange={(o) => setSelectedCountries(o)}
                        />
                        <label htmlFor="institutionEmail">
                            Institution E-mail
                        </label>
                        <input
                            ref={institutionEmailRef}
                            className={`${isDarkTheme ? "placeholder:text-[#CBD0DD] outline-[#2684FF] bg-[#223A4F]" : "placeholder:text-[#0F1820] outline-[#73AFFF] bg-[#F0F3FB]"} text-ellipsis shadow-sm focus:outline transition-all duration-75 outline-2 font-normal rounded-3xl min-h-[1.5em] gap-[.5em] p-[.5em] px-6`}
                            type="text"
                            placeholder="Type the email..."
                        />
                        <div className="project-description flex flex-col w-full space-y-2">
                            <label htmlFor="projectDescription">
                                Project Description
                            </label>
                            <textarea
                                ref={institutionDescriptionRef}
                                className={`${isDarkTheme ? "placeholder:text-[#CBD0DD] bg-[#223A4F]" : "placeholder:text-[#0F1820] bg-[#F0F3FB]"} focus:outline transition-all duration-75 outline-2 font-normal outline-[#2684FF] rounded-3xl min-h-[1.5em] gap-[.5em] p-[.5em] px-6 py-3 resize-none`}
                                placeholder="Type the description..."
                                rows={5}
                            />
                        </div>
                    </div>
                    <div className="sm:col-start-3 flex flex-col mx-2 space-y-2">
                        <h1>Social Medias</h1>
                        {socialMedias.map((social_media, index) => {
                            const IconComponent =
                                iconMap[social_media.social_media] || FaGlobe;
                            return (
                                <div key={index} className="relative">
                                    <IconComponent className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                                    <input
                                        ref={(el) =>
                                            (socialMediaRefs.current[
                                                social_media.social_media
                                            ] = el)
                                        }
                                        className={`${isDarkTheme ? "placeholder:text-[#CBD0DD] outline-[#2684FF] bg-[#223A4F]" : "placeholder:text-[#0F1820] outline-[#73AFFF] bg-[#F0F3FB]"} text-ellipsis w-full shadow-sm focus:outline transition-all duration-75 outline-2 font-normal rounded-3xl min-h-[1.5em] gap-[.5em] p-[.5em] px-6 pl-10`}
                                        type="text"
                                        placeholder={social_media.social_media}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="form-row-1 col-start-1 flex flex-col mx-2 max-w-[49%] min-w-[420px] space-y-2">
                        <label htmlFor="institutionImages">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            accept=".png,.jpg,.jpeg,.svg,.bmp,.ico,.webp"
                            onChange={handleImageChange}
                        />
                        <p className="text-sm text-gray-500">
                            The first image will be the profile picture.
                        </p>
                    </div>
                    {imagePreviews.length > 0 && (
                        <div className="form-row-1 flex flex-col mx-2">
                            <label>Uploaded Images:</label>
                            <div className="flex flex-wrap space-x-2">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="fixed bottom-10 right-10">
                        <button
                            className="confirm shadow-lg hover:opacity-80 transition-opacity duration-300 w-[110px] text-white px-4 p-2 bg-[#673366] me-5 rounded-3xl"
                            onClick={() => navigate("/Institution")}
                        >
                            Voltar
                        </button>
                        <button
                            className="confirm shadow-lg hover:opacity-80 transition-opacity duration-300 text-white px-4 p-2 bg-[#2684ff] rounded-3xl"
                            onClick={handlePost}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex fixed inset-0 h-screen justify-center items-center">
                    <LoadSpinner />
                </div>
            )}
        </>
    );
}
