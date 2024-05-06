import addLight from "@assets/Add.png";
import addDark from "@assets/Add_dark.png";
import { useThemeDetector } from "@util/ThemeDetector";

interface AddProps {
    url: string;
}

export default function Add({ url }: AddProps) {
    const isDarkTheme = useThemeDetector();

    return (
        <div>
            <button className="h-[56px] w-[56px] rounded-full">
                <a href={url}>
                    <img
                        width="40px"
                        src={isDarkTheme ? addDark : addLight}
                        alt="Add Button"
                    />
                </a>
            </button>
        </div>
    );
}
