import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import UserInfo from "@components/UserInfo.tsx";

export default function User() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"User"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <UserInfo />
                </div>
            </div>
        </>
    );
}
