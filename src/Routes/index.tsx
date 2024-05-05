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

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"*"} element={<Error404 />} />
                <Route path={"/"} element={<HeroPage />} />
                <Route path={"/Home"} element={<Home />} />
                <Route path={"/Institution"} element={<Institutions />} />
                <Route path={"/Projects"} element={<Projects />} />
                <Route path={"/CreateProject"} element={<Projects />} />
                <Route path={"/Enrolled"} element={<Enrolled />} />
                <Route path={"/Results"} element={<Results />} />
                <Route path={"/user"} element={<User />} />
                <Route path={"/Signout"} element={<Signout />} />
            </Routes>
        </BrowserRouter>
    );
}
