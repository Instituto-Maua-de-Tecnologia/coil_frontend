import SideBar from "@components/SideBar.tsx";
import TitleHeader from "@components/TitleHeader.tsx";
import InstitutionList from "@components/InstitutionList.tsx";

export default function Institutions() {
    return (
        <>
            <div className="m-3">
                <TitleHeader title={"Institutions"} />
                <div className="flex flex-row">
                    <SideBar />
                    <InstitutionList />
                </div>
            </div>
        </>
    );
}
