import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import EnrolledList from "@components/Enrolled/EnrolledList.tsx";
import { ActivityTypeEnum } from "@enums/ActivityTypeEnum.ts";

interface ActivityProps {
    activity_type: ActivityTypeEnum;
}

export default function Enrolled({ activity_type }: ActivityProps) {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Enrolled"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row ">
                    <SideBar />
                    <EnrolledList
                        type_activity={
                            activity_type === ActivityTypeEnum.PROJECT
                        }
                    />
                </div>
            </div>
        </>
    );
}
