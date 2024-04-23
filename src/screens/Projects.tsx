import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import ProjectList from "@components/ProjectList";
import { ProjectProps } from "@constants/ProjectListProperties.ts";

export default function Projects() {
    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Projects"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    <ProjectList isFilter projects={ProjectProps} />
                </div>
            </div>
            {/* <TitleHeader title={"Projects Information"} />
            <div className="flex flex-row mt-[1rem] lg:ml-0 2xs:m-[1rem]">
                <SideBar />
                <div className="flex flex-col w-full">
                    <ContainerSection
                        title={dummyText[0].title}
                        description=""
                        className="w-full h-[14rem]"
                    />
                    <div className="flex flex-col lg:flex-row min-h-[36rem] pt-[1rem]">
                        <ContainerSection
                            title={dummyText[1].title}
                            description={dummyText[1].description}
                            className="lg:w-[60%] lg:mr-[1rem]"
                        />
                        <ContainerSection
                            title={dummyText[2].title}
                            description={dummyText[2].description}
                            className="lg:w-[40%] 2xs:mt-[1rem] lg:mt-0"
                        />
                    </div>
                </div>
            </div> */}
        </>
    );
}
