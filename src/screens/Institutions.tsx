import SideBar from "@components/SideBar.tsx";
import TitleHeader from "@components/TitleHeader.tsx";

export default function Institutions() {
    return (
        <>
            <TitleHeader title={"Institutions"} />
            <SideBar />
            <div className="pl-[13rem] overflow-hidden"></div>
        </>
    );
}
