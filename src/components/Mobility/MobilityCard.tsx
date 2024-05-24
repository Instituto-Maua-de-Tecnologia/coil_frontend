import SVGIcon from "../ImageInstances/SVGIcon";
import { Mobility } from "../../types";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import { useNavigate } from "react-router-dom";

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
    const user = JSON.parse(localStorage.getItem("user") as string);
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (user.user_type === UserTypeEnum.STUDENT) onClick(mobility);
        else if (user.user_type === UserTypeEnum.ADMIN)
            navigate("/CreateProject", { state: { userStatus: 3 } });
    };
    const isDarkTheme = useThemeDetector();
    return (
        <li
            className={`sm:flex items-center ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-4 w-full`}
        >
            <div className="flex sm:relative items-center sm:justify-between w-full">
                <div className="sm:flex sm:-w-full text-center sm:-text-center w-full sm:items-center">
                    {mobility.partner_institutions?.[0]?.institution?.images[0]
                        .image !== undefined && (
                        <div className="sm:avatar-wrapper sm:flex flex-col mr-4">
                            <img
                                src={
                                    mobility.partner_institutions?.[0]
                                        ?.institution?.images[0].image
                                }
                                alt="Avatar"
                                className="avatar-img mx-auto min-w-16 max-w-16 rounded-full"
                            />
                        </div>
                    )}
                    <div className="flex flex-col grow">
                        <div className="mb-2 text-center sm:text-start font-bold">
                            {mobility.title}
                        </div>
                        <div className="flex mb-2 w-full sm:justify-start justify-center">
                            <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-normal w-full">
                                <p className="text-xs mr-2">Languages:</p>
                                <div
                                    className={`grid ${mobility.languages?.length === 1 ? "grid-cols-1  justify-items-center" : "grid-cols-2"} sm:flex sm:flex-wrap gap-2 w-full`}
                                >
                                    {mobility.languages?.map(
                                        (mobility, index) => (
                                            <div
                                                key={
                                                    "Project SVGICon Language" +
                                                    index
                                                }
                                                className="border-[#673366] mt-1 sm:mt-0 flex flex-row border-[1px]  pe-1 ps-2 py-1 items-center justify-between rounded-full text-[#673366]"
                                            >
                                                <p className="xs:text-xs text-[.5rem] me-2">
                                                    {mobility.language.language}
                                                </p>
                                                <SVGIcon
                                                    src={`https://hatscripts.github.io/circle-flags/flags/${mobility.language.language_code}.svg`}
                                                    className="w-4 m-[1px]"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="flex flex-row w-full sm:justify-start justify-center">
                                <p className="text-xs mr-2">
                                    {
                                        mobility.partner_institutions?.[0]
                                            ?.institution?.countries[0].country
                                            ?.country
                                    }
                                </p>
                                <SVGIcon
                                    src={`https://hatscripts.github.io/circle-flags/flags/${mobility.partner_institutions?.[0]?.institution?.countries[0].country?.country_code}.svg`}
                                    className="w-4 m-[1px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:flex items-center w-auto sm:min-w-24  gap-4 flex-col sm:justify-end mr-2">
                        <div className={`text-blue-500`}>
                            {mobility.activity_status?.name.replace("_", " ")}
                        </div>
                        {user.user_type === UserTypeEnum.STUDENT ? (
                            <button
                                onClick={handleOnClick}
                                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                            >
                                {enrolled ? "Disenroll" : "Enroll"}
                            </button>
                        ) : (
                            <button
                                onClick={handleOnClick}
                                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}
