import ProjectListHero from "@components/Project/ProjectList";

export default function OpenOpportunities() {
    return (
        <>
            <h1
                id="open-opportunities"
                className="mb-6 text-center hero-text text-2xl md:text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-[#673366] from-[21%] via-[#0C5AA4] via-[47%] to-[#0C5AA4] to-[100%]"
            >
                Discover our Opportunities
            </h1>
            <div className="flex flex-col md:flex-row content-center sm:w-300px md:w-1024px">
                <div
                    className={`justify-center wrap bg-[#1782E8] ml-[2%] rounded-3xl sm:w-full md:w-[45%] md:h-10%`}
                >
                    <h1 className="text-center mt-5 text-4xl font font-semibold">
                        International Projects
                    </h1>
                    <div className="p-5 pt-2">
                        <ProjectListHero />
                    </div>
                </div>
                <div
                    className={`justify-center wrap bg-[#1782E8] md:ml-[5%] rounded-3xl sm:w-full md:w-[45%] md:h-10%`}
                >
                    <h1 className="text-center mt-5 text-4xl font font-semibold">
                        Academic Mobility
                    </h1>
                    <div className="p-5 pt-2">
                        <ProjectListHero />
                    </div>
                </div>
            </div>
        </>
    );
}
