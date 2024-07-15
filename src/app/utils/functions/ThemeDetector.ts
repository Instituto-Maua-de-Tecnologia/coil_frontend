import { useEffect, useState } from "react";

export const useThemeDetector = () => {
    const getWatchMedia = () =>
        window.matchMedia("(prefers-color-scheme: dark)");
    const [isDarkTheme, setIsDarkTheme] = useState(getWatchMedia().matches);

    const mqListener = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
    };

    useEffect(() => {
        const mq = getWatchMedia();
        mq.addListener(mqListener); // best practice is use addEventListener instead of addListener, but when we change to addEventListener the page doesn't update automatically
        return () => mq.removeListener(mqListener);
    }, []);
    return isDarkTheme;
};
