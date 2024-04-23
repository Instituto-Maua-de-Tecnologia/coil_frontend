import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import UserInfo from "@components/UserInfo.tsx";
import ProjectList from "@components/ProjectList.tsx";
import ContainerSection from "@components/ContainerSection";

export default function Home() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Home"} />
                <div className="flex flex-1 mx-3 mb-3 overflow-hidden">
                    <SideBar />
                    <div
                        id="homepage-content"
                        className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden lg:ml-4"
                    >
                        <div className="w-full mb-4">
                            <UserInfo />
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-1/2 lg:mr-2 mb-4 lg:mb-0">
                                <ContainerSection title="Available Projects">
                                    <ProjectList
                                        isFilter={false}
                                        isSearch={false}
                                    />
                                </ContainerSection>
                            </div>
                            <div className="w-full lg:w-1/2 lg:ml-2">
                                <ContainerSection title="Current Projects">
                                    <ProjectList
                                        isFilter={false}
                                        isSearch={false}
                                    />
                                </ContainerSection>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
