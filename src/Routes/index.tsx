import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/Home.tsx";
import SideBar from "../components/SideBar";

export default function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <SideBar />
                <div className="pl-[13rem] overflow-hidden">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}
