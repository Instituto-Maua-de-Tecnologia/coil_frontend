import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import UserInfo from "@components/User/UserInfo.tsx";

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
