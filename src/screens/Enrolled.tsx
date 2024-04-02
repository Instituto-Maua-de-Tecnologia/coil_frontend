import TitleHeader from "../components/TitleHeader.tsx";
import SideBar from "../components/SideBar.tsx";

export default function Enrolled() {
    return (
        <>
            <TitleHeader title={"Institutions"} />
            <SideBar />
            <div className="pl-[13rem] overflow-hidden"></div>
        </>
    );
}
