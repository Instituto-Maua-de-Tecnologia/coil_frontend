import addLight from "@assets/Add.png";
import addDark from "@assets/Add_dark.png";
import { useThemeDetector } from "@util/ThemeDetector";

export default function Add() {
    const isDarkTheme = useThemeDetector();

    return (
        <div>
            <button
                onClick={() => {}}
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
