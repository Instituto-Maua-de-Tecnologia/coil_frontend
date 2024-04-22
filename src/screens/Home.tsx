import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import UserInfo from "@components/UserInfo.tsx";
import ProjectList from "@components/ProjectList.tsx";

export default function Home() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Home"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <UserInfo />
                    <ProjectList isFilter={false} />
                </div>
            </div>
        </>
    );
}
