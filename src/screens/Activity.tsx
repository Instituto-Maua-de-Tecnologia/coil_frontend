import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import ProjectList from "@components/ProjectList.tsx";
import { ProjectProps } from "@constants/ProjectListProperties.ts";

export default function Activity() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Activity"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <ProjectList isFilter projects={ProjectProps} />
                </div>
            </div>
        </>
    );
}
