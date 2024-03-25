import { createPortal } from "react-dom";
import AppRoutes from "./Routes";
import { useThemeDetector } from "./util/ThemeDetector";

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
