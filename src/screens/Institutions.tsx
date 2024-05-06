import SideBar from "@components/GenericComponents/SideBar";
import TitleHeader from "@components/GenericComponents/TitleHeader";
import InstitutionList from "@components/Institution/InstitutionList";
import { InstitutionsProps } from "@constants/InstitutionListProperties.ts";

export default function Institutions() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Institutions"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <InstitutionList isAdmin institutions={InstitutionsProps} />
                </div>
            </div>
        </>
    );
}
