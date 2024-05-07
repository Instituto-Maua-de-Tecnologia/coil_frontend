import addLight from "@assets/icons/Add.png";
import addDark from "@assets/icons/Add_dark.png";
import { useThemeDetector } from "@util/ThemeDetector";
import { useNavigate } from "react-router-dom";

interface AddProps {
    url: string;
}

export default function Add({ url }: AddProps) {
    const isDarkTheme = useThemeDetector();
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => navigate(url)}
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
