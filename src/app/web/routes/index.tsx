import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import getUser from "@integrations/user/authentification/get_user.ts";
import toast from "react-hot-toast";
import { UserTypeEnum } from "@enums/UserTypeEnum.ts";
import IUser from "@interfaces/user/IUser.ts";
import { ActivityTypeEnum } from "@enums/ActivityTypeEnum.ts";
import { LoadSpinner } from "@components/GenericComponents/LoadSpinner.tsx";

const Home = lazy(() => import("@screens/Home.tsx"));
const Institutions = lazy(() => import("@screens/Institutions.tsx"));
const Enrolled = lazy(() => import("@screens/Enrolled.tsx"));
const Projects = lazy(() => import("@screens/Projects.tsx"));
const Results = lazy(() => import("@screens/Results.tsx"));
const User = lazy(() => import("@screens/User.tsx"));
const Signout = lazy(() => import("@screens/Signout.tsx"));
const HeroPage = lazy(() => import("@screens/HeroPage.tsx"));
const Error404 = lazy(() => import("@screens/404.tsx"));
const CreateActivity = lazy(() => import("@screens/CreateActivity.tsx"));
const ViewEnrolledStudents = lazy(
    () => import("@screens/ViewEnrolledStudents.tsx")
);
const InstitutionInfo = lazy(() => import("@screens/InstitutionInfo.tsx"));
const ProjectInfo = lazy(() => import("@screens/ProjectInfo.tsx"));
const CreateModerator = lazy(() => import("@screens/CreateModerator.tsx"));
const CreateInstitution = lazy(() => import("@screens/CreateInstitution.tsx"));

export default function AppRoutes() {
    const possibleRoutes = useMemo(
        () => [
            "Home",
            "Institution",
            "InstitutionInfo",
            "COIL",
            "COILInfo",
            "CreateCOIL",
            "CreateMobility",
            "Mobilities",
            "Enrolled",
            "Results",
            "CreateModerator",
            "User",
            "Signout",
            "EnrolledStudents"
        ],
        []
    );
    const adminPages = useMemo(
        () => [
            "CreateCOIL",
            "CreateMobility",
            "EnrolledStudents",
            "CreateModerator",
            "CreateInstitution"
        ],
        []
    );
    const [location, setLocation] = useState(
        window.location.pathname.replace("/", "")
    );
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkAndNavigateBack = () => {
            const userToken = JSON.parse(
                localStorage.getItem("user") as string
            ) as IUser;
            if (
                userToken === null &&
                adminPages.includes(window.location.pathname.replace("/", ""))
            )
                window.history.back();
            if (
                (userToken?.user_type as UserTypeEnum) !== UserTypeEnum.ADMIN &&
                (userToken?.user_type as UserTypeEnum) !==
                    UserTypeEnum.MODERATOR &&
                adminPages.includes(window.location.pathname.replace("/", ""))
            ) {
                window.history.back();
            }
        };
        const handleLocationChange = () => {
            setLocation(window.location.pathname.replace("/", ""));
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
        if (
            possibleRoutes.includes(window.location.pathname.replace("/", ""))
        ) {
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
            <Suspense
                fallback={
                    <div
                        className={
                            "fixed flex-col inset-0 flex items-center justify-center"
                        }
                    >
                        <LoadSpinner />
                    </div>
                }
            >
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
                    <Route
                        path={"/CreateMobility"}
                        element={<CreateActivity />}
                    />
                    <Route
                        path={"/CreateInstitution"}
                        element={<CreateInstitution />}
                    ></Route>
                    <Route
                        path={"/CreateModerator"}
                        element={<CreateModerator />}
                    />
                    <Route path={"/Mobilities"} element={<Projects />} />
                    <Route
                        path={"/Enrolled"}
                        element={
                            <Enrolled
                                activity_type={ActivityTypeEnum.PROJECT}
                            />
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
            </Suspense>
        </BrowserRouter>
    );
}
