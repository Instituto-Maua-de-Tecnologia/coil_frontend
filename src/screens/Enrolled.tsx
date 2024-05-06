import TitleHeader from "../components/GenericComponents/TitleHeader.tsx";
import SideBar from "../components/GenericComponents/SideBar.tsx";
import EnrolledList from "@components/GenericComponents/EnrolledList.tsx";
import { MobilityProps } from "@constants/MobilityProperties.ts";

export default function Enrolled() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Enrolled"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row ">
                    <SideBar />
                    <EnrolledList enrolleds={MobilityProps} />
                </div>
            </div>
        </>
    );
}
