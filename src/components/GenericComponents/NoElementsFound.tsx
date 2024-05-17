import { useThemeDetector } from "@util/ThemeDetector";

interface NotFoundProps {
    message: string;
}

export default function NoElementsFound({ message }: NotFoundProps) {
    const isDarkTheme = useThemeDetector();
    return (
        <div className="text-center mt-[25vh] space-y-2">
            <h1
                className={`font-light text-7xl mb-8 ${isDarkTheme ? "text-[#223A4F]" : "text-[#CBD0DD]"}`}
            >
                {":("}
            </h1>
            <p
                className={`text-xl font-bold ${isDarkTheme ? "text-[#223A4F]" : "text-[#CBD0DD]"}`}
            >
                {message}
            </p>
            <p
                className={`font-bold ${isDarkTheme ? "text-[#223A4F]" : "text-[#CBD0DD]"}`}
            >
                Try again later...
            </p>
        </div>
    );
}
