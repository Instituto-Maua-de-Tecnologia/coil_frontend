import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import UserHome from "@components/User/UserHome.tsx";
import { useState, useEffect } from "react";
import { SpeedDial } from "primereact/speeddial";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";
import HomepageList from "@components/Home/HomepageList.tsx";
import IUser from "@interfaces/user/IUser.ts";
import "primeicons/primeicons.css";

export default function Home() {
    const [user, setUser] = useState<IUser>({
        name: "",
        id: "",
        email: "",
        user_type: 0,
        created_at: "",
        updated_at: ""
    });
    const token = localStorage.getItem("user");
    const userToken = JSON.parse(
        localStorage.getItem("user") as string
    ) as IUser;
    useEffect(() => {
        const userTemp = userToken;
        if (userTemp) {
            setUser({
                id: userTemp.id,
                name: userTemp.name,
                email: userTemp.email,
                user_type: userTemp.user_type,
                created_at: userTemp.created_at,
                updated_at: userTemp.updated_at
            });
        }
    }, [token]);
    const navigate = useNavigate();

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Home"} />
                <div className="flex-grow h-screen overflow-hidden mx-3 mb-3 flex flex-row">
                    <SideBar />
                    <div className="custom-scrollbar overflow-auto lg:overflow-hidden max-h-screen flex-col w-full ">
                        {userToken?.user_type ===
                            UserTypeEnum.MODERATOR.valueOf() ||
                            (userToken?.user_type ===
                                UserTypeEnum.ADMIN.valueOf() && (
                                <>
                                    <Tooltip
                                        target=".speeddial-bottom-right .p-speeddial-action"
                                        position="left"
                                    />
                                    <SpeedDial
                                        model={[
                                            {
                                                label: "Criar COIL",
                                                icon: "pi pi-file-plus",
                                                command: () => {
                                                    navigate("/CreateCOIL", {
                                                        state: {
                                                            type_activity: 1
                                                        }
                                                    });
                                                }
                                            },
                                            {
                                                label: "Criar Mobilidade Acadêmica",
                                                icon: "pi pi-pencil",
                                                command: () => {
                                                    navigate(
                                                        "/CreateMobility",
                                                        {
                                                            state: {
                                                                type_activity: 2
                                                            }
                                                        }
                                                    );
                                                }
                                            },
                                            {
                                                label:
                                                    userToken.user_type === 3
                                                        ? "Criar Moderador"
                                                        : "Ver Moderadores",
                                                icon: "pi pi-user-plus",
                                                command: () => {
                                                    navigate(
                                                        "/CreateModerator"
                                                    );
                                                }
                                            }
                                        ]}
                                        direction="up"
                                        className="speeddial-bottom-right right-0 bottom-0 m-6"
                                    />
                                </>
                            ))}
                        <div
                            className={`flex 2xs:flex-col sm:flex-row wrap rounded-3xl w-full md:h-25%`}
                        >
                            {user && <UserHome userHome={user} />}
                        </div>
                        <div className="mt-4 w-full md:h-3/4">
                            <HomepageList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
