import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/Home.tsx";
import SideBar from "../components/SideBar";

export default function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <SideBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
