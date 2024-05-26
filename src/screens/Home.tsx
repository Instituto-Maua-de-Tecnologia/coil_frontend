import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import UserHome, { UserHomeProps } from "@components/User/UserHome";
import { useState, useEffect } from "react";
import { SpeedDial } from "primereact/speeddial";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import HomepageList from "@components/Project/HomepageList";

export default function Home() {
    const [user, setUser] = useState<UserHomeProps>({
        userHome: {
            name: "",
            id: "",
            email: "",
            user_type: 0,
            created_at: "",
            updated_at: ""
        }
    });
    useEffect(() => {
        const userTemp = localStorage.getItem("user") as string;
        if (userTemp) {
            setUser({
                userHome: {
                    id: JSON.parse(userTemp).id,
                    name: JSON.parse(userTemp).name,
                    email: JSON.parse(userTemp).email,
                    user_type: JSON.parse(userTemp).user_type,
                    created_at: JSON.parse(userTemp).created_at,
                    updated_at: JSON.parse(userTemp).updated_at
                }
            });
        }
    }, [localStorage.getItem("user")]);
    const navigate = useNavigate();

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Home"} />
                <div className="flex-grow h-screen overflow-hidden mx-3 mb-3 flex flex-row">
                    <SideBar />
                    <div className="custom-scrollbar overflow-auto lg:overflow-hidden max-h-screen flex-col w-full ">
                        {(JSON.parse(localStorage.getItem("user") as string)
                            ?.user_type === UserTypeEnum.MODERATOR ||
                            JSON.parse(localStorage.getItem("user") as string)
                                ?.user_type === UserTypeEnum.ADMIN) && (
                            <>
                                <Tooltip
                                    target=".speeddial-bottom-right .p-speeddial-action"
                                    position="left"
                                />
                                <SpeedDial
                                    model={[
                                        {
                                            label: "Criar Projeto",
                                            icon: "pi pi-file-plus",
                                            command: () => {
                                                navigate("/CreateCOIL", {
                                                    state: { type_activity: 1 }
                                                });
                                            }
                                        },
                                        {
                                            label: "Criar Mobilidade Acadêmia",
                                            icon: "pi pi-pencil",
                                            command: () => {
                                                navigate("/CreateMobility", {
                                                    state: { type_activity: 2 }
                                                });
                                            }
                                        },
                                        {
                                            label:
                                                JSON.parse(
                                                    localStorage.getItem(
                                                        "user"
                                                    ) as string
                                                ).user_type === 3
                                                    ? "Criar Moderador"
                                                    : "Ver Moderadores",
                                            icon: "pi pi-user-plus",
                                            command: () => {
                                                navigate("/CreateModerator");
                                            }
                                        }
                                    ]}
                                    direction="up"
                                    className="speeddial-bottom-right right-0 bottom-0 m-6"
                                />
                            </>
                        )}
                        <div
                            className={`flex 2xs:flex-col sm:flex-row wrap rounded-3xl w-full md:h-25%`}
                        >
                            {user && <UserHome userHome={user.userHome} />}
                        </div>
                        <div className="mt-4 lg:flex h-full w-full md:h-3/4">
                            <HomepageList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
