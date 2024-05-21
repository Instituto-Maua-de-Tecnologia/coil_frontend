import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ProjectList from "@components/Project/ProjectList";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { SpeedDial } from "primereact/speeddial";
import { UserTypeEnum } from "@enum/UserTypeEnum";

export default function Projects() {
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    ).user_type;

    const navigate = useNavigate();
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Projects"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    {user_type === UserTypeEnum.ADMIN ? (
                        <>
                            <Tooltip
                                target=".speeddial-bottom-right .p-speeddial-action"
                                position="left"
                            />
                            <SpeedDial
                                model={[
                                    {
                                        label: "Criar Projeto",
                                        icon: "pi pi-pencil",
                                        command: () => {
                                            navigate("/CreateProject", {
                                                state: { type_activity: 1 }
                                            });
                                        }
                                    }
                                ]}
                                direction="up"
                                className="speeddial-bottom-right right-0 bottom-0 m-6"
                            />
                        </>
                    ) : null}
                    <SideBar />
                    <ProjectList />
                </div>
            </div>
        </>
    );
}
