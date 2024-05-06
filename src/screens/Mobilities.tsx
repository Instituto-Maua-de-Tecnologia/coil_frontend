import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import { ProjectProps } from "@constants/ProjectListProperties.ts";
import MobilityList from "@components/MobilityList";

const userAdmin = true;

export default function Mobilities() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Academic International Mobility"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <MobilityList
                        isFilter
                        isAdmin={userAdmin}
                        mobilitys={ProjectProps}
                    />
                </div>
            </div>
        </>
    );
}
