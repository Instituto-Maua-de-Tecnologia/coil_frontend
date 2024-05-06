import addLight from "@assets/Add.png";
import addDark from "@assets/Add_dark.png";
import { useThemeDetector } from "@util/ThemeDetector";
import { useNavigate } from "react-router-dom";

export default function Add() {
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => navigate("/CreateProject")}
                className="h-[56px] w-[56px] rounded-full"
            >
                <img
                    width="40px"
                    src={isDarkTheme ? addDark : addLight}
                    alt="Add Button"
                />
            </button>
        </div>
    );
}
