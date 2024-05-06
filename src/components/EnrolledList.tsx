import { useState } from "react";
import EnrolledCard from "./EnrolledCard";
import Search from "./Search";
import Filter from "@components/Filter.tsx";
import { Enrolled } from "../types";
import Modal from "./Modal";
import { useThemeDetector } from "@util/ThemeDetector.ts";
import "../style/scrollbar.css";
import Add from "./Add";

interface EnrolledListProps {
    enrolleds: Enrolled[];
    isFilter: boolean;
    isAdmin: boolean;
}
export default function EnrolledList({
    enrolleds,
    isFilter,
    isAdmin
}: EnrolledListProps) {
    const [selectedEnrolled, setSelectedEnrolled] = useState<Enrolled | null>(
        null
    );
    const [filteredEnrolleds, setFilteredEnrolleds] =
        useState<Enrolled[]>(enrolleds);
    const handleModalOpen = (enrolled: Enrolled) => {
        setSelectedEnrolled(enrolled);
    };
    console.log(localStorage.getItem("token") as string);

    const handleModalClose = () => {
        setSelectedEnrolled(null);
    };

    const handleSearch = (searchTerm: string) => {
        const filtered = enrolleds.filter(
            (enrolled) =>
                enrolled.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                enrolled.partnerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                enrolled.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEnrolleds(filtered);
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
            {filteredEnrolleds.length > 0 ? (
                <div>
                    <ul className="w-full max-h-screen pb-48 pe-5 custom-scrollbar overflow-y-auto">
                        {filteredEnrolleds.map((enrolled) => (
                            <EnrolledCard
                                key={enrolled.id}
                                enrolled={enrolled}
                                onClick={handleModalOpen}
                            />
                        ))}
                    </ul>
                    {selectedEnrolled && (
                        <Modal
                            enrolled={selectedEnrolled}
                            isOpen={true}
                            onClose={handleModalClose}
                        />
                    )}
                </div>
            ) : (
                <p className="mx-auto my-5 text-center text-2xl">
                    No enrolled matched the search criteria
                </p>
            )}
        </div>
    );
}
