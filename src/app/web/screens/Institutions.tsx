import SideBar from "@components/GenericComponents/SideBar.tsx";
import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import InstitutionList from "@components/Institution/InstitutionList.tsx";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";

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
                        isAdmin={
                            user_type === UserTypeEnum.ADMIN ||
                            user_type === UserTypeEnum.MODERATOR
                        }
                    />
                </div>
            </div>
        </>
    );
}
