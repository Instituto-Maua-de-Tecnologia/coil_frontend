import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import MobilityList from "@components/Mobility/MobilityList";
import { MobilityProps } from "@constants/MobilityProperties";

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
                        mobilitys={MobilityProps}
                    />
                </div>
            </div>
        </>
    );
}
