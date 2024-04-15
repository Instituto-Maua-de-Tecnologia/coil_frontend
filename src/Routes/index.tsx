import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@screens/Home.tsx";
import Institutions from "@screens/Institutions.tsx";
import Enrolled from "@screens/Enrolled.tsx";
import Projects from "@screens/Projects.tsx";
import Results from "@screens/Results.tsx";
import User from "@screens/User.tsx";
import Signout from "@screens/Signout.tsx";
import Hero from "@components/Hero.tsx";
import Error404 from "@screens/404.tsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Error404 />} />
                <Route path={"/"} element={<Home />} />
                <Route path={"/Institutions"} element={<Institutions />} />
                <Route path={"/Projects"} element={<Projects />} />
                <Route path={"/Enrolled"} element={<Enrolled />} />
                <Route path={"/Results"} element={<Results />} />
                <Route path={"/User"} element={<User />} />
                <Route path={"/Signout"} element={<Signout />} />
                <Route path={"/landing"} element={<Hero />} />
            </Routes>
        </BrowserRouter>
    );
}
