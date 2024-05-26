import SideBar from "@components/GenericComponents/SideBar";
import TitleHeader from "@components/GenericComponents/TitleHeader";
import InstitutionList from "@components/Institution/InstitutionList";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";

export default function Institutions() {
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    )?.user_type;
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Institutions"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <InstitutionList
                        isAdmin={user_type === UserTypeEnum.ADMIN}
                    />
                </div>
            </div>
        </>
    );
}
