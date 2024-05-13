import { createPortal } from "react-dom";
import AppRoutes from "./Routes";
import { useThemeDetector } from "./util/ThemeDetector";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import ToasterContainer from "@components/GenericComponents/ToasterContainer.tsx";

export default function App() {
    const msalInstance = new PublicClientApplication({
        auth: {
            clientId: import.meta.env.VITE_CLIENT_ID as string,
            authority: import.meta.env.VITE_AUTHORITY as string,
            redirectUri: "/"
        }
    });
    const isDarkTheme = useThemeDetector();
    return (
        <MsalProvider instance={msalInstance}>
            <ToasterContainer></ToasterContainer>
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
        </MsalProvider>
    );
}
//TODO: colocar um useEffect que verifica se o token
