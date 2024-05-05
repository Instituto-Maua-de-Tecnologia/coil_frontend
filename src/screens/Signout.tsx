import TitleHeader from "@components/TitleHeader.tsx";
import SideBar from "@components/SideBar.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

export default function Signout() {
    const { instance } = useMsal();
    const navigate = useNavigate();

    /* eslint-disable */
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

    useEffect(() => {
        handleSignout();
    }, [navigate, handleSignout]);
    /* eslint-enable */

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
