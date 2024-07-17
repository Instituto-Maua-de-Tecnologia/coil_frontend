import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import ProjectInformation from "@components/Project/ProjectInformation.tsx";
import { useLocation } from "react-router-dom";

export default function ProjectInfo() {
    const location = useLocation() as { state: { projectID: string } };
    const project = location.state?.projectID;
    const isProject =
        window.location.pathname === "/COILInfo" ? "COIL" : "Mobility";

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={`${isProject} Information`} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <ProjectInformation id={project} />
                </div>
            </div>
        </>
    );
}
