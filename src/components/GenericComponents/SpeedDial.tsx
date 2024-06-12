import { ReactNode, useState } from "react";
import Add from "@components/Icons/Add";
import AddCOIL from "@components/Icons/AddCOIL";
import AddMobility from "@components/Icons/AddMobility";
import AddModerator from "@components/Icons/AddModerator";
import { useNavigate } from "react-router-dom";

const SpeedDial = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Função para renderizar o botão com tooltip
    const renderButton = (
        icon: ReactNode,
        tooltipText: string,
        onClick: () => void
    ) => (
        <div className="group relative">
            <button
                onClick={onClick}
                className="mb-4 drop-shadow text-white bg-[#2684ff] hover:bg-[#216FD6] p-5 rounded-full focus:outline-none focus:ring-4 focus:ring-white"
            >
                {icon}
            </button>
            <span className="absolute w-auto p-4 m-1 min-w-max right-[105%] bg-[#223A4F] text-white text-s rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out">
                {tooltipText}
            </span>
        </div>
    );

    return (
        <div className="fixed flex flex-col items-center bottom-8 right-8 z-50">
            <div
                className={`flex flex-col items-center ${isOpen ? "block" : "hidden"}`}
            >
                {renderButton(<AddModerator />, "Criar Moderador", () =>
                    navigate("/CreateModerator")
                )}
                {renderButton(<AddMobility />, "Criar Mobilidade", () =>
                    navigate("/CreateMobility", { state: { type_activity: 1 } })
                )}
                {renderButton(<AddCOIL />, "Criar COIL", () =>
                    navigate("/CreateMobility", { state: { type_activity: 0 } })
                )}
            </div>
            <button
                className={`text-white drop-shadow bg-[#2684ff] hover:bg-[#216FD6] p-5 rounded-full  ${isOpen ? "outline-none ring-4 ring-blue-300" : ""} transition-transform ${isOpen ? "rotate-45" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Add />
            </button>
        </div>
    );
};

export default SpeedDial;
