import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";

export default function Results() {
    return (
        <>
            <TitleHeader title={"Results"} />
            <SideBar />
            <div className="pl-[13rem] overflow-hidden"></div>
        </>
    );
}
