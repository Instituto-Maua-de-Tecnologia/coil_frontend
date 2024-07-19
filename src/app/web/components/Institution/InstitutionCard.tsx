import { useThemeDetector } from "@functions/ThemeDetector.ts";
import IAllInstitutions from "@interfaces/institution/IAllInstitutions.ts";
import { useNavigate } from "react-router-dom";

export default function InstitutionCard({ logo, name, id }: IAllInstitutions) {
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();

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
                            className="object-contain max-w-32 sm:max-w-24 mx-auto rounded-full"
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
