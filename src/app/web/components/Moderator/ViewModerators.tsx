import { useEffect, useState } from "react";
import getAllModerators from "@integrations/user/admin/get_all_moderators.ts";
import NoElementsFound from "@components/GenericComponents/NoElementsFound.tsx";
import { MoonLoader } from "react-spinners";
import { useThemeDetector } from "@functions/ThemeDetector.ts";

interface User {
    created_at: string;
    email: string;
    id: string;
    name: string;
    updated_at: string;
    user_type: number;
}

export default function ViewModerators() {
    const [moderators, setModerators] = useState<User[]>();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const handleGetAllModerators = async () => {
            const response = (await getAllModerators().finally(() =>
                setLoaded(true)
            )) as User[];
            setModerators(response);
        };
        void handleGetAllModerators();
    }, []);

    const isDarkTheme = useThemeDetector();

    return (
        <>
            {loaded ? (
                moderators !== undefined ? (
                    <div
                        className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
                    >
                        <div>
                            <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                                {moderators.map(
                                    (moderator: User, index: number) => (
                                        <li
                                            key={"ModeratorCard" + index}
                                            className={`sm:flex items-center py-10 ${isDarkTheme ? "bg-[#0F1820]" : "bg-[#F0F3FB]"} rounded-3xl p-4 mb-2 w-full`}
                                        >
                                            <div className="flex sm:relative sm:justify-between w-full">
                                                <div className="sm:flex w-full sm:items-center">
                                                    <div className="sm:ps-10 font-bold w-full">
                                                        {moderator?.name}
                                                    </div>
                                                    <div className="font-bold text-end sm:pe-10 w-full">
                                                        {moderator?.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className={"w-full text-center"}>
                        <NoElementsFound message="No students were found" />
                    </div>
                )
            ) : (
                <div className="flex justify-center items-center mt-auto">
                    <MoonLoader
                        color={`${isDarkTheme ? "#f9f9f9" : "#090909"}`}
                        size={35}
                    />
                </div>
            )}
        </>
    );
}
