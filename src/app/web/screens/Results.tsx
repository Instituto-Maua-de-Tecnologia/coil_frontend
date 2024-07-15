import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import ResultList from "@components/Result/ResultList.tsx";
import { useEffect, useState } from "react";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import { MoonLoader } from "react-spinners";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import IResults from "@interfaces/results/IResults.ts";

export default function Results() {
    const [results, setResults] = useState<IResults>();
    const [loaded, setLoaded] = useState(false);
    const handleResults = async () => {
        const resultsValues = (await getAllActivitiesEnrolled({
            type_activity: 2
        })
            .catch((e) => console.error(e.message))
            .finally(() => setLoaded(true))) as IResults;
        setResults(resultsValues);
    };

    useEffect(() => {
        handleResults();
    }, []);

    const isDarkTheme = useThemeDetector();

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Results"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                    {loaded ? (
                        <ResultList results={results as IResults[]} />
                    ) : (
                        <div className="flex justify-center items-center mt-auto">
                            <MoonLoader
                                color={`${isDarkTheme ? "#f9f9f9" : "#090909"}`}
                                size={35}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
