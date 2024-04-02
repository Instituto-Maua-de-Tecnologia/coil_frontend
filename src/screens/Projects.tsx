import TitleHeader from "../components/TitleHeader.tsx";
import SideBar from "../components/SideBar.tsx";
import ContainerSection from "../components/ContainerSection.tsx";

export default function Projects() {
    return (
        <>
            <TitleHeader title={"Projects Information"} />
            <div className="flex flex-row mt-[1rem]  mr-[1rem]">
                <SideBar />
                <div className="flex flex-col w-full">
                    <ContainerSection
                        title="Collaborative Online International Learning"
                        description=""
                        className="w-full h-[14rem]"
                    />
                    <div className="flex flex-row min-h-[36rem] pt-[1rem]">
                        <ContainerSection
                            title="Project Info"
                            description=""
                            className="w-[65%] mr-[1rem]"
                        />
                        <ContainerSection
                            title="Criteria"
                            description=""
                            className="w-[35%]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
