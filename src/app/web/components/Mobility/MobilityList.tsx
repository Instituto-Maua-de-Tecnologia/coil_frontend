import { useEffect, useState } from "react";
import MobilityCard from "./MobilityCard";
import Search from "../GenericComponents/Search";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@functions/ThemeDetector.ts";
import "@styles/scrollbar.css";
import getAllActivities from "@integrations/activity/get_all_activities.ts";
import getAllActivitiesEnrolled from "@integrations/activity/student/get_all_activities_enrolled.ts";
import NoElementsFound from "@components/GenericComponents/NoElementsFound";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import IAllProjects from "@interfaces/project/IAllProjects.ts";

export default function MobilityList() {
    const [mobilities, setMobilities] = useState<IAllProjects[]>([]);
    const [enrolledMobilitiesIds, setEnrolledMobilitiesIds] = useState<
        string[]
    >([]);
    const [selectedMobility, setSelectedMobility] =
        useState<IAllProjects | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [filteredMobilities, setFilteredMobilities] = useState<
        IAllProjects[]
    >([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(4);

    const handleGetAllMobilities = async () => {
        try {
            const mobilityValues = (await getAllActivities({
                type_activity: "2"
            })) as IAllProjects[];
            setMobilities(mobilityValues);
            setFilteredMobilities(mobilityValues); // Initialize filteredMobilities
        } catch (error) {
            console.error("Erro ao obter mobilidades acadêmicas:", error);
        } finally {
            setLoaded(true);
        }
    };

    const enrolledIdsToArray = (enrolledProjects: IAllProjects[]) => {
        return enrolledProjects.map((project) => `${project.id}`);
    };

    const handleModalOpen = (mobility: IAllProjects) => {
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
                mobility.activity_status.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredMobilities(filtered);
        setFirst(0);
    };

    const isDarkTheme = useThemeDetector();

    useEffect(() => {
        const handleGetEnrolledMobilities = async () => {
            await getAllActivitiesEnrolled({ type_activity: 2 })
                .then((response) => {
                    setEnrolledMobilitiesIds(
                        enrolledIdsToArray(response as IAllProjects[])
                    );
                })
                .catch((error) => {
                    console.error("Erro ao obter projetos:", error);
                });
        };
        const handleGets = async () => {
            await handleGetEnrolledMobilities();
            await handleGetAllMobilities();
        };
        void handleGets();
    }, []);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const currentItems = filteredMobilities.slice(first, first + rows);

    return (
        <div
            className={`w-full lg:ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex justify-between">
                <Search onSearch={handleSearch} disabled={false} />
                <Paginator
                    className={`h-14 mr-[26px] ${isDarkTheme ? "bg-[#14222E] text-white" : "bg-[#FFFFFF]"}`}
                    first={first}
                    rows={rows}
                    totalRecords={filteredMobilities.length}
                    onPageChange={onPageChange}
                />

                <div className="button-container flex absolute right-12">
                    {/* {isAdmin ? <Add url="/CreateMobility" /> : null} */}
                    {/* {isFilter && <Filter />} */}
                </div>
            </div>
            {loaded ? (
                mobilities.length > 0 ? (
                    filteredMobilities.length > 0 ? (
                        <div>
                            <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                                {currentItems.map((mobility) => (
                                    <MobilityCard
                                        key={"MobilityCardKey" + mobility.id}
                                        mobility={mobility}
                                        enrolled={handleVerifyEnrollment(
                                            mobility.id
                                        )}
                                        onClick={handleModalOpen}
                                    />
                                ))}
                            </ul>
                            {selectedMobility ? (
                                <Modal
                                    enrolled={enrolledMobilitiesIds.includes(
                                        selectedMobility.id
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
                )
            ) : (
                <div className="flex mt-[15%] fill-slate-500 justify-center items-center">
                    <LoadSpinner />
                </div>
            )}
        </div>
    );
}
