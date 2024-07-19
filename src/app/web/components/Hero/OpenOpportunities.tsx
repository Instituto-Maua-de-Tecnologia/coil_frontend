import HeroProjectList from "./HeroProjectList";
import ICatalog from "@interfaces/catalog/ICatalog.ts";

interface OpenOpportunitiesProps {
    loaded: boolean;
    catalog: ICatalog;
}

export default function OpenOpportunities({
    loaded,
    catalog
}: OpenOpportunitiesProps) {
    return (
        <>
            <h1
                id="open-opportunities"
                className="mb-6 md:mt-10 text-center hero-text text-2xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-[#673366] from-[21%] via-[#0C5AA4] via-[47%] to-[#0C5AA4] to-[100%]"
            >
                Discover our Opportunities
            </h1>
            <div className="flex flex-col md:flex-row content-center sm:w-300px md:w-1024px">
                <div
                    className={`justify-center wrap bg-[#1782E8] ml-[2%] md:ml-[3%] 2xs:m-4 sm:mt-0 sm:mb-5 rounded-3xl sm:w-full md:w-[45%] md:h-10% md:mt-5`}
                >
                    <h1 className="text-center mt-5 text-4xl font font-semibold text-white">
                        International Projects
                    </h1>
                    <div className="p-5 ">
                        <HeroProjectList
                            loaded={loaded}
                            catalog={catalog}
                            isProject
                        />
                    </div>
                </div>
                <div
                    className={`justify-center wrap bg-[#1782E8] md:ml-[3%] 2xs:m-4 sm:mt-0 rounded-3xl sm:w-full md:w-[45%] md:h-10% md:mt-5`}
                >
                    <h1 className="text-center mt-5 text-4xl font font-semibold text-white">
                        Academic Mobility
                    </h1>
                    <div className="p-5">
                        <HeroProjectList
                            loaded={loaded}
                            catalog={catalog}
                            isProject={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
