import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SignUp from "@screens/SignUp.tsx";
import Mobilities from "@screens/Mobilities.tsx";
import ViewEnrolledStudents from "@screens/ViewEnrolledStudents";
import { ActivityTypeEnum } from "@enum/ActivityTypeEnum.ts";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"*"} element={<Error404 />} />
                <Route path={"/"} element={<HeroPage />} />
                <Route path={"/Signup"} element={<SignUp />} />
                <Route path={"/Home"} element={<Home />} />
                <Route path={"/Institution"} element={<Institutions />} />
                <Route path={"/Projects"} element={<Projects />} />
                <Route
                    path={"/CreateProject"}
                    element={
                        <CreateActivity
                            activity_type={ActivityTypeEnum.PROJECT}
                        />
                    }
                />
                <Route
                    path={"/CreateMobility"}
                    element={
                        <CreateActivity
                            activity_type={ActivityTypeEnum.ACADEMIC_MOBILITY}
                        />
                    }
                />
                <Route path={"/Mobilities"} element={<Mobilities />} />
                <Route path={"/Enrolled"} element={<Enrolled />} />
                <Route path={"/Results"} element={<Results />} />
                <Route path={"/User"} element={<User />} />
                <Route path={"/Signout"} element={<Signout />} />
                <Route
                    path={"/ViewEnrolledStudents"}
                    element={<ViewEnrolledStudents />}
                />
            </Routes>
        </BrowserRouter>
    );
}
