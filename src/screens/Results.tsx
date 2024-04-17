import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";

export default function Results() {
    return (
        <>
            <div className="m-3">
                <TitleHeader title={"Results"} />
                <SideBar />
                <div className="pl-[13rem] overflow-hidden"></div>
            </div>
        </>
    );
}
