import { useThemeDetector } from "@util/ThemeDetector";

export type ProjectProps = {
    projectSumUp: {
        id: number;
        name: string;
        language: string;
        contry: string;
        applicationStart: string;
        applicationEnd: string;
        Status: any;
    };
};

export default function ProjectInformation() {
    // const { avatarUrl, title, status, languages, country, applicationStart, applicationEnd } = project;

    const isDarkTheme = useThemeDetector();

    return (
        <div className="md:custom-scrollbar overflow-y-auto flex-col w-full m-3 mb-0 mt-0 ">
            <div
                className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
            >
                <div className="2xs:text-center place-items-center p-2 sm:w-1/6">
                    <img src="" alt="institution-img"></img>
                    <div className="">institution-name</div>
                </div>
                <div className="2xs:text-center sm:text-left p-2 sm:w-4/6">
                    <div className="font-extrabold">name</div>
                    <div className="">language</div>
                    <div className="">contry</div>
                </div>
                <div className="2xs:text-center md:text-right sm:w-1/6">
                    <div className="">status</div>
                    <div className="font{20px}">application-start</div>
                    <div className="mb-2">application-end</div>
                    <button
                        // onClick={handleOnClick}
                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                    >
                        Enrol
                    </button>
                </div>
            </div>
            <div className="mt-4 md:flex w-full md:h-3/4">
                <div
                    className={` justify rounded-3xl p-4 pb-0 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:w-2/3 md:mr-2`}
                >
                    <div className="p-3 font-extrabold ">
                        Project description
                    </div>
                    <div className="custom-scrollbar overflow-y-auto h-full p-3">
                        dumy{" "}
                    </div>
                </div>
                <div
                    className={` justify rounded-3xl p-4 pb-0 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-1/3 md:ml-2`}
                >
                    <div className="p-3 font-extrabold">Project criteria</div>
                    <div className="custom-scrollbar overflow-y-auto h-full p-3">
                        dumy
                    </div>
                </div>
            </div>
        </div>
    );
}
