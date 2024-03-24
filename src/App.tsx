import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AppRoutes from "./Routes";

const useThemeDetector = () => {
    const getWatchMedia = () =>
        window.matchMedia("(prefers-color-scheme: dark)");
    const [isDarkTheme, setIsDarkTheme] = useState(getWatchMedia().matches);

    const mqListener = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
    };

    useEffect(() => {
        const mq = getWatchMedia();
        mq.addListener(mqListener); // best practice is use addEventListener instead of addListener, but when we change for addEventListener the page doesn't update automatically
        return () => mq.removeListener(mqListener);
    }, []);
    return isDarkTheme;
};

export default function App() {
    const isDarkTheme = useThemeDetector();
    return (
        <>
            {createPortal(
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={
                        isDarkTheme
                            ? "/maua-fontys-light.svg"
                            : "maua-fontys-dark.svg"
                    }
                />,
                document.getElementById("link-by-user-theme") as
                    | Element
                    | DocumentFragment
            )}
            <AppRoutes />
        </>
    );
}
