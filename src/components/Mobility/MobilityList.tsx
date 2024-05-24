import { useEffect, useState } from "react";
import MobilityCard from "./MobilityCard";
import Search from "../GenericComponents/Search";
// import Filter from "@components/GenericComponents/Filter";
import { Mobility } from "../../types";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "@style/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import { Paginator } from "primereact/paginator";

type MobilityProps = {
    id?: string;
    title?: string;
    start_date?: string;
    end_date?: string;
    created_at?: string;
    updated_at?: string;
    courses?: [
        {
            course_id: number;
            course: {
                id: number;
                course: string;
            };
        }
    ];
    languages?: [
        {
            language_id: number;
            language: {
                id: number;
                language: string;
                language_code: string;
            };
        }
    ];
    criterias?: {
        criteria_id: number;
        criteria: [
            {
                id: number;
                criteria: string;
            }
        ];
    };
    partner_institutions?: [
        {
            institution_id?: string;
            institution?: {
                id: string;
                name: string;
                description: string;
                email: string;
                social_medias: [
                    {
                        id?: number;
                        institution_id?: string;
                        social_media_id?: number;
                        link?: string;
                        media?: {
                            id: number;
                            name: string;
                        };
                    }
                ];
                countries: [
                    {
                        id?: number;
                        institution_id?: string;
                        country_id?: number;
                        country?: {
                            id: number;
                            country: string;
                            country_code: string;
                        };
                    }
                ];
                images: [
                    {
                        image?: string;
                    }
                ];
            };
        }
    ];
    activity_status?: {
        id: number;
        name: string;
    };
    activity_type?: {
        id: number;
        name: string;
    };
};

export default function MobilityList() {
    const [mobilities, setMobilities] = useState<MobilityProps[]>([]);
    const [enrolledMobilitiesIds, setEnrolledMobilitiesIds] = useState<
        string[]
    >([]);
    const [selectedMobility, setSelectedMobility] = useState<Mobility | null>(
        null
    );
    const [loaded, setLoaded] = useState<boolean>(false);
    const [filteredMobilities, setFilteredMobilities] = useState<
        MobilityProps[]
    >([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(4);

    const handleGetAllMobilities = async () => {
        try {
            const mobilityValues = (await getAllActivities({
                type_activity: "2"
            })) as MobilityProps[];
            setMobilities(mobilityValues);
            setFilteredMobilities(mobilityValues); // Initialize filteredMobilities
        } catch (error) {
            console.error("Erro ao obter mobilidades acadêmicas:", error);
        } finally {
            setLoaded(true);
        }
    };

    const enrolledIdsToArray = (enrolledProjects: MobilityProps[]) => {
        return enrolledProjects.map((project) => `${project.id}`);
    };

    const handleGetEnrolledMobilities = async () => {
        await getAllActivitiesEnrolled({ type_activity: 2 })
            .then((response) => {
                setEnrolledMobilitiesIds(
                    enrolledIdsToArray(response as MobilityProps[])
                );
            })
            .catch((error) => {
                console.error("Erro ao obter projetos:", error);
            });
    };

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
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                mobility.partner_institutions?.[0]?.institution?.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                mobility.activity_status?.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredMobilities(filtered);
        setFirst(0); // Reset to first page on search
    };

    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        const handleGets = async () => {
            await handleGetEnrolledMobilities();
            await handleGetAllMobilities();
        };
        handleGets();
    }, []);

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    // Calculate the current items to display
    const currentItems = filteredMobilities.slice(first, first + rows);

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex justify-between">
                <Search onSearch={handleSearch} disabled={false} />
                <Paginator
                    className="h-14 mr-[26px]"
                    first={first}
                    rows={rows}
                    rowsPerPageOptions={[3, 5, 10]}
                    totalRecords={filteredMobilities.length}
                    onPageChange={onPageChange}
                />

                <div className="button-container flex absolute right-12">
                    {/* {isAdmin ? <Add url="/CreateMobility" /> : null} */}
                    {/* {isFilter && <Filter />} */}
                </div>
            </div>

            {mobilities.length > 0 ? (
                filteredMobilities.length > 0 ? (
                    <div>
                        {loaded ? (
                            <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                                {currentItems.map((mobility) => (
                                    <MobilityCard
                                        key={"MobilityCardKey" + mobility.id}
                                        mobility={mobility}
                                        enrolled={handleVerifyEnrollment(
                                            mobility.id as string
                                        )}
                                        onClick={handleModalOpen}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <div className="flex mt-[15%] fill-slate-500 justify-center items-center">
                                <LoadSpinner />
                            </div>
                        )}
                        {selectedMobility ? (
                            <Modal
                                enrolled={enrolledMobilitiesIds.includes(
                                    selectedMobility.id as string
                                )}
                                project={selectedMobility}
                                isOpen={true}
                                onClose={handleModalClose}
                            />
                        ) : null}
                    </div>
                ) : mobilities.length > 0 ? (
                    <NoElementsFound message="No opportunities were found" />
                ) : (
                    <NoElementsFound message="No opportunities matched the criteria" />
                )
            ) : (
                <NoElementsFound message="No opportunities were found" />
            )}
        </div>
    );
}
