import { Route, Routes } from "react-router-dom";
import Config from "../pages/Config";
import Home from "../pages/Home";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/config" element={<Config />} />
        </Routes>
    );
}