import TitleHeader from "../components/TitleHeader.tsx";
import SideBar from "../components/SideBar.tsx";

export default function Projects() {
    return (
        <>
            <TitleHeader title={"Projects"} />
            <SideBar />
            <div className="pl-[13rem] overflow-hidden"></div>
        </>
    );
}
