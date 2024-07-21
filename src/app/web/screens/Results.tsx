import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import ResultList from "@components/Result/ResultList.tsx";
import { useEffect, useState } from "react";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import IResults from "@interfaces/results/IResults.ts";
import { AxiosError } from "axios";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner.tsx";

export default function Results() {
    const [results, setResults] = useState<IResults>();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const handleResults = async () => {
            const resultsValues = (await getAllActivitiesEnrolled({
                type_activity: 2
            })
                .catch((e: AxiosError) => console.error(e.message))
                .finally(() => setLoaded(true))) as IResults;
            setResults(resultsValues);
        };
        void handleResults();
    }, []);

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Results"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    {loaded ? (
                        <ResultList results={results as IResults[]} />
                    ) : (
                        <div className="flex mt-[15%] fill-slate-500 w-screen h-10 justify-center">
                            <LoadSpinner />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
