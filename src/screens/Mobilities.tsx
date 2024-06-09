import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import MobilityList from "@components/Mobility/MobilityList";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import { Tooltip } from "primereact/tooltip";
import { SpeedDial } from "primereact/speeddial";
import { useNavigate } from "react-router-dom";

export default function Mobilities() {
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    )?.user_type;
    const navigate = useNavigate();
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Academic International Mobility"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    {user_type === UserTypeEnum.ADMIN ||
                    user_type === UserTypeEnum.MODERATOR ? (
                        <>
                            <Tooltip
                                target=".speeddial-bottom-right .p-speeddial-action"
                                position="left"
                            />
                            <SpeedDial
                                model={[
                                    {
                                        label: "Criar Mobilidade Acadêmica",
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
                                            )?.user_type === 3
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
                    ) : null}
                    <SideBar />
                    <MobilityList />
                </div>
            </div>
        </>
    );
}
