import SideBar from "@components/SideBar.tsx";
import TitleHeader from "@components/TitleHeader.tsx";
import InstitutionList from "@components/InstitutionList.tsx";
import { InstitutionsProps } from "@constants/InstitutionListProperties.ts";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";

export default function Institutions() {
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    ).user_type;
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Institutions"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <InstitutionList
                        isAdmin={user_type === UserTypeEnum.ADMIN}
                        institutions={InstitutionsProps}
                    />
                </div>
            </div>
        </>
    );
}
