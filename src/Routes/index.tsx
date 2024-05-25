import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@screens/Home.tsx";
import Institutions from "@screens/Institutions.tsx";
import Enrolled from "@screens/Enrolled.tsx";
import Projects from "@screens/Projects.tsx";
import Results from "@screens/Results.tsx";
import User from "@screens/User.tsx";
import Signout from "@screens/Signout.tsx";
import HeroPage from "@screens/HeroPage.tsx";
import Error404 from "@screens/404.tsx";
import CreateActivity from "@screens/CreateActivity";
import Mobilities from "@screens/Mobilities.tsx";
import ViewEnrolledStudents from "@screens/ViewEnrolledStudents";
import { ActivityTypeEnum } from "@enum/ActivityTypeEnum.ts";
import ProjectInfo from "@screens/ProjectInfo";
import { useEffect, useState } from "react";
import getUser from "@integrations/user/authentification/get_user.ts";
import InstitutionInfo from "@screens/InstitutionInfo";
import toast from "react-hot-toast";
import { UserTypeEnum } from "@enum/UserTypeEnum.ts";
import CreateModerator from "@screens/CreateModerator.tsx";

export default function AppRoutes() {
    const possibleRoutes = [
        "/Home",
        "/Institution",
        "/InstitutionInfo",
        "/COIL",
        "/COILInfo",
        "/CreateCOIL",
        "/CreateMobility",
        "/Mobilities",
        "/Enrolled",
        "/Results",
        "/CreateModerator",
        "/User",
        "/Signout",
        "/EnrolledStudents"
    ];
    const adminPages = [
        "/CreateCOIL",
        "/CreateMobility",
        "/EnrolledStudents",
        "/CreateModerator"
    ];
    const [location, setLocation] = useState(window.location.pathname);

    /* eslint-disable */
    const checkAndNavigateBack = () => {
        if (
            JSON.parse(localStorage.getItem("user") as string)?.user_type ===
            null
        )
            window.history.back();
        if (
            adminPages.includes(window.location.pathname) &&
            JSON.parse(localStorage.getItem("user") as string)?.user_type ===
                UserTypeEnum.STUDENT
        ) {
            window.history.back();
        }
    };

    useEffect(() => {
        const handleLocationChange = () => {
            setLocation(window.location.pathname);
        };
        const pushState = window.history.pushState;
        const replaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            pushState.apply(window.history, args);
            handleLocationChange();
        };

        window.history.replaceState = function (...args) {
            replaceState.apply(window.history, args);
            handleLocationChange();
        };

        window.addEventListener("popstate", handleLocationChange);

        checkAndNavigateBack();

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.history.pushState = pushState;
            window.history.replaceState = replaceState;
        };
    }, [location]);

    useEffect(() => {
        if (possibleRoutes.includes(window.location.pathname)) {
            if (
                !localStorage.getItem("user") ||
                !localStorage.getItem("token")
            ) {
                window.location.href = "/";
                localStorage.clear();
            } else {
                getUser({
                    token: localStorage.getItem("token") as string
                }).catch((error) => {
                    window.location.href = "/";
                    localStorage.clear();
                    toast.error("Acesso expirado, faça o Login novamente");
                    throw new Error(error);
                });
            }
        }
    }, []);

    async function handleUser() {
        const token = localStorage.getItem("token") as string;
        const user = await getUser({ token: token });
        localStorage.setItem("user", JSON.stringify(user));
    }

    useEffect(() => {
        handleUser();
    }, [localStorage.getItem("token")]);
    /* eslint-enable */
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"*"} element={<Error404 />} />
                <Route path={"/"} element={<HeroPage />} />
                <Route path={"/Home"} element={<Home />} />
                <Route path={"/Institution"} element={<Institutions />} />
                <Route
                    path={"/InstitutionInfo"}
                    element={<InstitutionInfo />}
                />
                <Route path={"/COIL"} element={<Projects />} />
                <Route path={"/COILInfo"} element={<ProjectInfo />} />
                <Route path={"/MobilityInfo"} element={<ProjectInfo />} />
                <Route path={"/MobilityInfo"} element={<ProjectInfo />} />
                <Route path={"/CreateCOIL"} element={<CreateActivity />} />
                <Route path={"/CreateMobility"} element={<CreateActivity />} />
                <Route
                    path={"/CreateModerator"}
                    element={<CreateModerator />}
                />
                <Route path={"/Mobilities"} element={<Mobilities />} />
                <Route
                    path={"/Enrolled"}
                    element={
                        <Enrolled activity_type={ActivityTypeEnum.PROJECT} />
                    }
                />
                <Route path={"/Results"} element={<Results />} />
                <Route path={"/User"} element={<User />} />
                <Route path={"/Signout"} element={<Signout />} />
                <Route
                    path={"/EnrolledStudents"}
                    element={<ViewEnrolledStudents />}
                />
            </Routes>
        </BrowserRouter>
    );
}
