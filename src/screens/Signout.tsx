import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";

export default function Signout() {
    return (
        <>
            <TitleHeader title={"Sign Out"} />
            <SideBar />
            <div className="pl-[13rem] overflow-hidden"></div>
        </>
    );
}
