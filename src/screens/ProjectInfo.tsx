import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ProjectInformation from "@components/Project/ProjectInformation";
import { useLocation } from "react-router-dom";

export default function ProjectInfo() {
    const location = useLocation();
    const project = location?.state?.project;

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Project Information"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <ProjectInformation id={project} />
                </div>
            </div>
        </>
    );
}
