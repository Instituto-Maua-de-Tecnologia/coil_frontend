import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import CreateActivityForm from "@components/Project/CreateActivityForm.tsx";
import { useLocation } from "react-router-dom";

export default function CreateInstitution() {
    const location = useLocation();
    const isEdit = location.state?.edit;
    return (
        <div className="max-h-screen flex flex-col">
            <TitleHeader title={"Criar Instituição"} />
            <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                <SideBar />
                <CreateActivityForm isEdit={isEdit} />
            </div>
        </div>
    );
}
