import TitleHeader from "../components/TitleHeader.tsx";
import SideBar from "../components/SideBar.tsx";

export default function Enrolled() {
    return (
        <>
            <div className="m-3">
                <TitleHeader title={"Enrolled"} />
                <SideBar />
                <div className="pl-[13rem] overflow-hidden"></div>
            </div>
        </>
    );
}
