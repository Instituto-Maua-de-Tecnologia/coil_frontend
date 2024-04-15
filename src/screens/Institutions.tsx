import SideBar from "@components/SideBar.tsx";
import TitleHeader from "@components/TitleHeader.tsx";
import ProjectList from "@components/ProjectList.tsx";

export default function Institutions() {
    return (
        <>
            <TitleHeader title={"Institutions"} />
            <div className="flex flex-row">
                <SideBar />
                <ProjectList />
            </div>
        </>
    );
}
