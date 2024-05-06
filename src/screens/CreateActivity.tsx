import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import CreateActivityForm from "@components/Project/CreateActivityForm.tsx";
import { ActivityTypeEnum } from "@enum/ActivityTypeEnum.ts";

interface ActivityProps {
    activity_type: ActivityTypeEnum;
}

export default function CreateActivity({ activity_type }: ActivityProps) {
    return (
        <div className="max-h-screen flex flex-col">
            <TitleHeader
                title={
                    activity_type === ActivityTypeEnum.PROJECT
                        ? "Criar Projetos"
                        : "Criar Mobilidade Acadêmica"
                }
            />
            <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                <SideBar />
                <CreateActivityForm
                    isProject={activity_type === ActivityTypeEnum.PROJECT}
                />
            </div>
        </div>
    );
}
