import EnrolledStudentsList from "@components/EnrolledStudentsList";
import SideBar from "@components/SideBar";
import TitleHeader from "@components/TitleHeader";
import { StudentListProps } from "@constants/StudentListProperties";

export default function ViewEnrolledStudents() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader
                    title={"Enrolled Students in (INSERIR NOME DO PROJETO)"}
                />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <EnrolledStudentsList students={StudentListProps} />
                </div>
            </div>
        </>
    );
}
