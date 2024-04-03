import TitleHeader from "../components/TitleHeader.tsx";
import SideBar from "../components/SideBar.tsx";

export default function User() {
    return (
        <>
            <TitleHeader title={"User"} />
            <SideBar />
            <div className="pl-[13rem] overflow-hidden"></div>
        </>
    );
}
