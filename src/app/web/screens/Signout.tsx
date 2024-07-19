import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

export default function Signout() {
    const { instance, accounts, inProgress } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleSignout() {
            if (inProgress === "none" && accounts.length > 0) {
                try {
                    await instance
                        .logout({
                            onRedirectNavigate: () => {
                                return false;
                            },
                            postLogoutRedirectUri: "/"
                        })
                        .then(() => {
                            navigate("/");
                            localStorage.clear();
                        });
                } catch (error) {
                    console.error("Logout error:", error);
                }
            } else {
                console.warn("MSAL is not initialized or no accounts found.");
            }
        }

        void handleSignout();
    }, [instance, inProgress, accounts, navigate]);

    return (
        <>
            <div className="max-h-screen flex flex-col">
                <TitleHeader title={"Sign Out"} />
                <div className="flex-grow h-screen mx-3 mb-3 overflow-hidden flex flex-row">
                    <SideBar />
                </div>
            </div>
        </>
    );
}
