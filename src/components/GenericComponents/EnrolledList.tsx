import { useEffect, useState } from "react";
import EnrolledCard from "./EnrolledCard.tsx";
import Search from "./Search.tsx";
import { Enrolled } from "../../types.ts";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";

interface EnrolledListProps {
    type_activity: boolean;
}

export default function EnrolledList({ type_activity }: EnrolledListProps) {
    const [filteredEnrolleds, setFilteredEnrolleds] = useState<Enrolled[]>([
        {
            id: "",
            title: "",
            description: "",
            status_id: 0,
            type_id: 0,
            start_date: "",
            end_date: "",
            created_at: "",
            updated_at: "",
            courses: [
                {
                    course_id: 0,
                    course: {
                        name: ""
                    }
                }
            ],
            languages: [
                {
                    language: ""
                }
            ],
            partner_institutions: [
                {
                    institution_id: "",
                    institution: {
                        id: "",
                        name: "",
                        country: "",
                        images: [
                            {
                                image: ""
                            }
                        ]
                    }
                }
            ],
            activity_status: {
                id: 0,
                name: ""
            },
            activity_type: {
                id: 0,
                name: ""
            },
            applications: [
                {
                    id: 0,
                    user_id: "",
                    activity_id: "",
                    status: false,
                    created_at: "",
                    updated_at: ""
                }
            ]
        }
    ]);

    const handleSearch = (searchTerm: string) => {
        if (filteredEnrolleds) {
            const filtered = filteredEnrolleds.filter(
                (enrolled) =>
                    enrolled.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    enrolled.partner_institutions
                        ?.map((fds) => fds.institution)
                        .map((fds) => fds?.name)
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    enrolled.applications
                        ?.map((fds) => (fds.status ? "sa" : "dsa"))
                        .map((sla) => sla.toLowerCase())
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredEnrolleds(filtered);
        }
    };

    async function getEnrolledData() {
        const activity = type_activity ? 1 : 2;
        try {
            const allActivitiesEnrolledData = await getAllActivitiesEnrolled({
                type_activity: activity
            });
            setFilteredEnrolleds(allActivitiesEnrolledData as Enrolled[]);
            console.log(filteredEnrolleds);
        } catch (error) {
            console.error("Error fetching institutions:", error);
        }
    }

    useEffect(() => {
        getEnrolledData();
    }, []);

    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
            </div>
            {filteredEnrolleds.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {filteredEnrolleds.map((enrolled) => (
                            <EnrolledCard
                                key={enrolled.id}
                                enrolled={enrolled}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No enrolled matched the search criteria
                </p>
            )}
        </div>
    );
}
