import TitleHeader from "@components/GenericComponents/TitleHeader.tsx";
import SideBar from "@components/GenericComponents/SideBar.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

export default function Signout() {
    const { instance } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleSignout() {
            localStorage.clear();
            await instance
                .logout({
                    onRedirectNavigate: () => {
                        return false;
                    }
                })
                .then(() => navigate("/"));
        }
        void handleSignout();
    }, [navigate, instance]);

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
