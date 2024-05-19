import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import CreateActivityForm from "@components/Project/CreateActivityForm.tsx";
import { ActivityTypeEnum } from "@enum/ActivityTypeEnum.ts";
import { useLocation } from "react-router-dom";

export default function CreateActivity() {
    const location = useLocation();
    const activity_type = location.state.type_activity;
    const isEdit = location.state.edit;
    // const project = location.state.project;
    return (
        <div className="max-h-screen flex flex-col">
            <TitleHeader
                title={
                    activity_type === ActivityTypeEnum.PROJECT
                        ? isEdit
                            ? "Edit Project"
                            : "Create Project"
                        : isEdit
                          ? "Edit Academic Mobility"
                          : "Create Academic Mobility"
                }
            />
            <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                <SideBar />
                <CreateActivityForm
                    isEdit={isEdit}
                    isProject={activity_type === ActivityTypeEnum.PROJECT}
                />
            </div>
        </div>
    );
}
