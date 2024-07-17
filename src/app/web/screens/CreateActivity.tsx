import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import CreateActivityForm from "@components/Project/CreateActivityForm.tsx";
import { ActivityTypeEnum } from "@enums/ActivityTypeEnum.ts";
import { useLocation } from "react-router-dom";
import IProject from "@interfaces/project/IProject.ts";

export default function CreateActivity() {
    const location = useLocation() as {
        state: {
            type_activity: number;
            edit: true;
        };
    };
    const activity_type = location.state?.type_activity;
    const isEdit = location.state?.edit;
    return (
        <div className="max-h-screen flex flex-col">
            <TitleHeader
                title={
                    activity_type === ActivityTypeEnum.PROJECT.valueOf()
                        ? isEdit
                            ? "Edit COIL"
                            : "Create COIL"
                        : isEdit
                          ? "Edit Academic Mobility"
                          : "Create Academic Mobility"
                }
            />
            <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                <SideBar />
                <CreateActivityForm
                    isEdit={{ edit: isEdit, projectToEdit: {} as IProject }}
                    isProject={
                        activity_type === ActivityTypeEnum.PROJECT.valueOf()
                    }
                />
            </div>
        </div>
    );
}
