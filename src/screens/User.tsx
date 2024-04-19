import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import UserInfo from "@components/UserInfo.tsx";

export default function User() {
    return (
        <>
            <div className="m-3">
                <TitleHeader title={"User"} />
                <div className="flex w-full flex-row">
                    <SideBar />
                    <UserInfo />
                </div>
            </div>
        </>
    );
}
