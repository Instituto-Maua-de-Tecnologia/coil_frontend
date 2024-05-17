import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ProjectList from "@components/Project/ProjectList";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { SpeedDial } from "primereact/speeddial";

export default function Projects() {
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    ).user_type;

    const navigate = useNavigate();
    return (
        <>
            {user_type === UserTypeEnum.ADMIN ? (
                <button
                    onClick={() => {
                        navigate("/CreateProject");
                    }}
                    title="Adicionar Projeto"
                    className="fixed z-90 bottom-10 right-8 bg-[#2684ff] w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700"
                >
                    <span className="mb-1">&#43;</span>
                </button>
            ) : null}
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Projects"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
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
                    <SideBar />
                    <ProjectList />
                </div>
            </div>
        </>
    );
}
