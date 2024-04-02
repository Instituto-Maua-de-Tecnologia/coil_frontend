import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/Home.tsx";
import Hero from "../components/Hero.tsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Hero />} />
            </Routes>
        </BrowserRouter>
    );
}
