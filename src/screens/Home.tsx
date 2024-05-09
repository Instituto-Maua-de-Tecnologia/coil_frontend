import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import UserInfo from "@components/User/UserInfo";
import ProjectList from "@components/Project/ProjectList";
import EnrolledList from "@components/GenericComponents/EnrolledList";

export default function Home() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Home"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <div className="custom-scrollbar overflow-y-auto flex-col w-full m-3 mb-0 mt-0 ">
                        <div
                            className={` flex 2xs:flex-col sm:flex-row wrap rounded-3xl p-4 w-full md:h-25%`}
                        >
                            <UserInfo />
                        </div>
                        <div className="mt-4 md:flex w-full md:h-3/4">
                            <ProjectList isFilter={false} isAdmin={false} />
                            <EnrolledList type_activity={false} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
