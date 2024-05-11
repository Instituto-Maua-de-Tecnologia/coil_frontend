import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import InstitutionInformation from "@components/Institution/InstitutionInformation";
import { useLocation } from "react-router-dom";

export default function InstitutionInfo() {
    const location = useLocation();
    const institution = location?.state?.institution;

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Institution Information"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <InstitutionInformation id={institution} />
                </div>
            </div>
        </>
    );
}
