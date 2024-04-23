import SideBar from "@components/SideBar.tsx";
import TitleHeader from "@components/TitleHeader.tsx";
import InstitutionList from "@components/InstitutionList.tsx";
import { InstitutionsProps } from "@constants/InstitutionListProperties.ts";

export default function Institutions() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Institutions"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <InstitutionList institutions={InstitutionsProps} />
                </div>
            </div>
        </>
    );
}
