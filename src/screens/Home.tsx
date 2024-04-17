import ProjectList from "@components/ProjectList.tsx";
import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";

export default function Home() {
    return (
        <>
            <div className="m-3">
                <TitleHeader title={"Home"} className={""} />
                <div className="flex flex-row">
                    <SideBar />
                    <ProjectList />
                </div>
            </div>
        </>
    );
}
