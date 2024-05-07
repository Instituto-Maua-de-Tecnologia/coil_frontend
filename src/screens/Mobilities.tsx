import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import MobilityList from "@components/Mobility/MobilityList";
import { MobilityProps } from "@constants/MobilityProperties";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";

export default function Mobilities() {
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    ).user_type;
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Academic International Mobility"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <MobilityList
                        isFilter
                        isAdmin={user_type === UserTypeEnum.ADMIN}
                        mobilitys={MobilityProps}
                    />
                </div>
            </div>
        </>
    );
}
