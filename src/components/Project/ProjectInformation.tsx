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
        <div className="flex-col w-full m-3 mt-0">
            <div
                className={`flex sm:plkace-items-center ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 mb- w-full h-1/4`}
            >
                <div className="place-items-center p-2 w-1/6">
                    <img src="" alt="institution-img"></img>
                    <div className="">institution-name</div>
                </div>
                <div className="p-2 w-4/6">
                    <div className="font-extrabold">name</div>
                    <div className="">language</div>
                    <div className="">contry</div>
                </div>
                <div className=" text-right p-2 w-1/6">
                    <div>status</div>
                    <div className="pt-5">application-start</div>
                    <div className="pb-5">application-end</div>
                    <button
                        // onClick={handleOnClick}
                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full"
                    >
                        Enroll
                    </button>
                </div>
            </div>
            <div className="mt-4 md:flex w-full h-3/4">
                <div
                    className={`justify rounded-3xl p-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:w-2/3 md:h-full md:mr-2`}
                >
                    <div className="p-3 font-extrabold ">
                        Project description
                    </div>
                    <div className="w-full h-full p-3">dumy </div>
                </div>
                <div
                    className={`justify rounded-3xl p-4 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-1/3 md:h-full md:ml-2`}
                >
                    <div className="p-3 font-extrabold">Project criteria</div>
                    <div className="w-full h-full p-3">dumy</div>
                </div>
            </div>
        </div>
    );
}
