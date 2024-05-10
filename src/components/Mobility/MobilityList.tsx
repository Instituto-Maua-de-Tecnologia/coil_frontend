import { useEffect, useState } from "react";
import MobilityCard from "./MobilityCard";
import Search from "../GenericComponents/Search";
import Filter from "@components/GenericComponents/Filter";
import { Mobility } from "../../types";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import Add from "../GenericComponents/Add";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import { MoonLoader } from "react-spinners";

type MobilityProps = {
    activity_status: {
        id: number;
        name: string;
    };
    activity_type: {
        id: number;
        name: string;
    };
    courses: [
        {
            course: {
                name: string;
            };
            course_id: number;
        }
    ];
    created_at: string;
    end_date: string;
    id: string;
    languages: [
        {
            language: string;
        }
    ];
    partner_institutions: [
        {
            institution: {
                country: string;
                id: string;
                images: [
                    {
                        image: string;
                    }
                ];
                name: string;
            };
            institution_id: string;
        }
    ];
    start_date: string;
    title: string;
    updated_at: string;
};
interface MobilityListProps {
    isFilter: boolean;
    isAdmin: boolean;
}
export default function MobilityList({ isFilter, isAdmin }: MobilityListProps) {
    const [mobilities, setMobilities] = useState<MobilityProps[]>([
        {
            activity_status: {
                id: 0,
                name: ""
            },
            activity_type: {
                id: 0,
                name: ""
            },
            courses: [
                {
                    course: {
                        name: ""
                    },
                    course_id: 0
                }
            ],
            created_at: "",
            end_date: "",
            id: "",
            languages: [
                {
                    language: ""
                }
            ],
            partner_institutions: [
                {
                    institution: {
                        country: "",
                        id: "",
                        images: [
                            {
                                image: ""
                            }
                        ],
                        name: ""
                    },
                    institution_id: ""
                }
            ],
            start_date: "",
            title: "",
            updated_at: ""
        }
    ]);
    const [enrolledMobilitiesIds, setEnrolledMobilitiesIds] = useState<
        string[]
    >([]);
    const [selectedMobility, setSelectedMobility] = useState<Mobility | null>(
        null
    );
    const [loaded, setLoaded] = useState<boolean>(false);
    const handleGetAllMobilities = async () => {
        try {
            const mobilityValues = (await getAllActivities({
                type_activity: "2"
            })) as MobilityProps[];
            setMobilities(mobilityValues);
        } catch (error) {
            console.error("Erro ao obter mobilidades acadêmicas:", error);
        } finally {
            setLoaded(true);
        }
    };

    const enrolledIdsToArray = (enrolledProjects: MobilityProps[]) => {
        return enrolledProjects.map((project) => {
            return `${project.id}`;
        });
    };

    const handleGetEnrolledMobilities = async () => {
        await getAllActivitiesEnrolled({ type_activity: "1" })
            .then((response) => {
                setEnrolledMobilitiesIds(
                    enrolledIdsToArray(response as MobilityProps[])
                );
            })
            .catch((error) => {
                console.error("Erro ao obter projetos:", error);
            });
    };
    const [filteredMobilities, setFilteredMobilities] =
        useState<MobilityProps[]>(mobilities);

    const handleModalOpen = (mobility: Mobility) => {
        setSelectedMobility(mobility);
    };

    const handleModalClose = () => {
        setSelectedMobility(null);
    };

    const handleVerifyEnrollment = (id: string) => {
        return enrolledMobilitiesIds.includes(id);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = mobilities.filter(
            (mobility) =>
                mobility.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                mobility.partner_institutions[0].institution.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                mobility.activity_status.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredMobilities(filtered);
    };

    const isDarkTheme = useThemeDetector();

    /* eslint-disable */

    useEffect(() => {
        const handleGets = async () => {
            await handleGetEnrolledMobilities();
            await handleGetAllMobilities();
        };
        handleGets();
    }, []);

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} disabled={false} />
                <div className="button-container flex absolute right-12">
                    {isAdmin ? <Add url="/CreateMobility" /> : null}
                    {isFilter && <Filter />}
                </div>
            </div>
            {filteredMobilities.length > 0 ? (
                <div>
                    {loaded ? (
                        <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                            {mobilities.map((mobility) => (
                                <MobilityCard
                                    key={mobility.id}
                                    mobility={mobility}
                                    enrolled={handleVerifyEnrollment(
                                        mobility.id
                                    )}
                                    onClick={handleModalOpen}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-center items-center mt-[25vh]">
                            <MoonLoader color="#FFFFFF" size={35} />
                        </div>
                    )}
                    {selectedMobility ? (
                        <Modal
                            project={selectedMobility}
                            isOpen={true}
                            onClose={handleModalClose}
                        />
                    ) : null}
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No mobility matched the search criteria
                </p>
            )}
        </div>
    );
}
