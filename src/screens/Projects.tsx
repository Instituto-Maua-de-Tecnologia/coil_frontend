import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ProjectList from "@components/Project/ProjectList";

export default function Projects() {
    const user_type = JSON.parse(
        localStorage.getItem("user") as string
    ).user_type;
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Projects"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <ProjectList
                        isFilter
                        isAdmin={user_type === UserTypeEnum.ADMIN}
                    />
                </div>
            </div>
        </>
    );
}
