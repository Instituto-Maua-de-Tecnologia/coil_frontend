import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";

export default function CreateInstitution() {
    return (
        <div className="max-h-screen flex flex-col">
            <TitleHeader title={"Criar Instituição"} />
            <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                <SideBar />
            </div>
        </div>
    );
}
