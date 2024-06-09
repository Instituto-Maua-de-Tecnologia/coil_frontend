import TitleHeader from "@components/GenericComponents/TitleHeader";
import SideBar from "@components/GenericComponents/SideBar";
import ResultList from "@components/Result/ResultList";
import { useEffect, useState } from "react";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import { MoonLoader } from "react-spinners";
import { useThemeDetector } from "@util/ThemeDetector.ts";

export interface ResultsProps {
    id?: string;
    title?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    languages?: [
        {
            id: number;
            language: string;
            language_code: string;
        }
    ];
    partner_institutions?: [
        {
            id: string;
            name: string;
            email: string;
            countries: [
                {
                    id: number;
                    country: {
                        id?: number;
                        country?: string;
                        country_code?: string;
                    };
                }
            ];
            images: string[];
            social_medias: string[];
        }
    ];
    criterias?: [
        {
            id: number;
            criteria: string;
        }
    ];
    status_activity?: number;
    type_activity?: number;
    created_at?: string;
    updated_at?: string;
    applicants?: [
        {
            status?: boolean;
        }
    ];
    courses?: [
        {
            id: number;
            course: string;
        }
    ];
}

export default function Results() {
    const [results, setResults] = useState<ResultsProps>();
    const [loaded, setLoaded] = useState(false);
    const handleResults = async () => {
        const resultsValues = (await getAllActivitiesEnrolled({
            type_activity: 2
        })
            .catch((e) => console.error(e.message))
            .finally(() => setLoaded(true))) as ResultsProps;
        console.log(resultsValues);
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
                        <ResultList results={results as ResultsProps[]} />
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
