import { useThemeDetector } from "@util/ThemeDetector.ts";
import { AllInstitutions } from "@components/Institution/InstitutionList.tsx";

interface InstitutionCardProps {
    institution: AllInstitutions;
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
    const { logo, name } = institution;
    const isDarkTheme = useThemeDetector();
    return (
        <li
            className={`sm:flex items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
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
                    </div>
                </div>
            </div>
        </li>
    );
}
