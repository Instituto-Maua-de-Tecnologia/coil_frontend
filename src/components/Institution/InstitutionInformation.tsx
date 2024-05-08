import { useThemeDetector } from "@util/ThemeDetector";

export default function InstitutionInformation() {
    const isDarkTheme = useThemeDetector();

    return (
        <div className="custom-scrollbar overflow-y-auto lg:overflow-y-visible flex-col w-full m-3 mb-0 mt-0 ">
            <div
                className={`flex 2xs:flex-col sm:flex-row wrap ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl p-4 w-full md:h-25%`}
            >
                <div className="self-center p-2 sm:w-1/6">
                    <img src="" alt="institution-img"></img>
                </div>
                <div className="2xs:text-center sm:text-left p-2 sm:w-4/6">
                    <div className="font-extrabold">name</div>
                    <div className="">location</div>
                    <div className="">catchphrase</div>
                    <div>website link</div>
                </div>
                <div className="2xs:text-center xs:text-right place-content-center xs:place-items-end pl-10 md:pl-0 pr-10 md:pr-1 flex">
                    <div className="pt-1 pb-1 ">social media</div>
                    <div className="p-1">social media</div>
                    <div className="pt-1 pb-1 ">social media</div>
                </div>
            </div>
            <div className="mt-4 md:flex w-full md:h-3/4">
                <div
                    className={` justify rounded-3xl p-4 md:pb-20 pb-0 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:w-1/3 md:mr-2`}
                >
                    <div className="p-3 font-extrabold ">
                        Institution information
                    </div>
                    <div className="custom-scrollbar overflow-y-auto  h-full p-3">
                        dumy
                    </div>
                </div>
                <div
                    className={` justify rounded-3xl p-4 pb-0 md:pb-20 mt-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} md:mt-0 md:w-2/3 md:ml-2`}
                >
                    <div className="p-3 font-extrabold">
                        Institution pictures
                    </div>
                    <div className="custom-scrollbar overflow-y-auto h-full p-3">
                        dumy
                    </div>
                </div>
            </div>
        </div>
    );
}
