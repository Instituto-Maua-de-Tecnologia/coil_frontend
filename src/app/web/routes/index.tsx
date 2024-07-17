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
import CreateActivity from "@screens/CreateActivity.tsx";
import Mobilities from "@screens/Mobilities.tsx";
import ViewEnrolledStudents from "@screens/ViewEnrolledStudents.tsx";
import { ActivityTypeEnum } from "@enums/ActivityTypeEnum.ts";
import ProjectInfo from "@screens/ProjectInfo.tsx";
import { useEffect, useMemo, useState } from "react";
import getUser from "@integrations/user/authentification/get_user.ts";
import InstitutionInfo from "@screens/InstitutionInfo.tsx";
import toast from "react-hot-toast";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";
import CreateModerator from "@screens/CreateModerator.tsx";
import CreateInstitution from "@screens/CreateInstitution.tsx";
import IUser from "@interfaces/user/IUser.ts";

export default function AppRoutes() {
    const possibleRoutes = useMemo(
        () => [
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
        ],
        []
    );
    const adminPages = useMemo(
        () => [
            "/CreateCOIL",
            "/CreateMobility",
            "/EnrolledStudents",
            "/CreateModerator",
            "/CreateInstitution"
        ],
        []
    );
    const [location, setLocation] = useState(window.location.pathname);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkAndNavigateBack = () => {
            const userToken = JSON.parse(
                localStorage.getItem("user") as string
            ) as IUser;
            if (userToken?.user_type === null) window.history.back();
            if (
                (userToken?.user_type as UserTypeEnum) !== UserTypeEnum.ADMIN &&
                (userToken?.user_type as UserTypeEnum) !==
                    UserTypeEnum.MODERATOR &&
                adminPages.includes(window.location.pathname)
            ) {
                window.history.back();
            }
        };
        const handleLocationChange = () => {
            setLocation(window.location.pathname);
        };
        const pushState = window.history.pushState.bind(window.history);
        const replaceState = window.history.replaceState.bind(window.history);

        window.history.pushState = function (
            ...args: Parameters<typeof window.history.pushState>
        ) {
            pushState(...args);
            handleLocationChange();
        };

        window.history.replaceState = function (
            ...args: Parameters<typeof window.history.replaceState>
        ) {
            replaceState(...args);
            handleLocationChange();
        };

        window.addEventListener("popstate", handleLocationChange);

        checkAndNavigateBack();

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.history.pushState = pushState;
            window.history.replaceState = replaceState;
        };
    }, [adminPages, location]);

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
                    throw new Error(error as string);
                });
            }
        }
    }, [possibleRoutes]);

    async function handleUser() {
        const token = localStorage.getItem("token") as string;
        const user = await getUser({ token: token });
        localStorage.setItem("user", JSON.stringify(user));
    }

    useEffect(() => {
        void handleUser();
    }, [token]);

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
                <Route path={"/CreateCOIL"} element={<CreateActivity />} />
                <Route path={"/CreateMobility"} element={<CreateActivity />} />
                <Route
                    path={"/CreateInstitution"}
                    element={<CreateInstitution />}
                ></Route>
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
