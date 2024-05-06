import { useState } from "react";
import MobilityCard from "./MobilityCard";
import Search from "../GenericComponents/Search";
import Filter from "@components/GenericComponents/Filter";
import { Mobility } from "../../types";
import Modal from "../Modal/Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";
import Add from "../GenericComponents/Add";

interface MobilityListProps {
    mobilitys: Mobility[];
    isFilter: boolean;
    isAdmin: boolean;
}
export default function MobilityList({
    mobilitys,
    isFilter,
    isAdmin
}: MobilityListProps) {
    const [selectedMobility, setSelectedMobility] = useState<Mobility | null>(
        null
    );
    const [filteredMobilitys, setFilteredMobilitys] =
        useState<Mobility[]>(mobilitys);
    const handleModalOpen = (mobility: Mobility) => {
        setSelectedMobility(mobility);
    };
    console.log(localStorage.getItem("token") as string);

    const handleModalClose = () => {
        setSelectedMobility(null);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = mobilitys.filter(
            (mobility) =>
                mobility.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                mobility.partnerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                mobility.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMobilitys(filtered);
    };
    const isDarkTheme = useThemeDetector();

    return (
        <div
            className={`w-full ml-4 px-7 py-4 ${isDarkTheme ? "bg-[#14222E]" : "bg-[#FFFFFF]"} rounded-3xl`}
        >
            <div className="mb-4 flex">
                <Search onSearch={handleSearch} />
                <div className="button-container flex absolute right-12">
                    {isAdmin ? <Add /> : null}
                    {isFilter && <Filter />}
                </div>
            </div>
            {filteredMobilitys.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {filteredMobilitys.map((mobility) => (
                            <MobilityCard
                                key={mobility.id}
                                mobility={mobility}
                                onClick={handleModalOpen}
                            />
                        ))}
                    </ul>
                    {selectedMobility && (
                        <Modal
                            project={selectedMobility}
                            isOpen={true}
                            onClose={handleModalClose}
                        />
                    )}
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No mobility matched the search criteria
                </p>
            )}
        </div>
    );
}
