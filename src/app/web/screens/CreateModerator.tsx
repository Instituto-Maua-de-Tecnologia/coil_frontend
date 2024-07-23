import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import CreateModeratorForm from "@components/Moderator/CreateModeratorForm.tsx";

export default function CreateModerator() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Create Moderator"} />
                <div className="flex-grow h-screen me-3 sm:mx-3 mb-3 overflow-hidden flex flex-row ">
                    <SideBar />
                    <CreateModeratorForm />
                </div>
            </div>
        </>
    );
}
