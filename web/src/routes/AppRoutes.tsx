import { Route, Routes } from "react-router-dom";
import Config from "../pages/config";
import Familia from "../pages/config/Familia";
import Integrantes from "../pages/config/Integrantes";
import Home from "../pages/Home";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/config" element={<Config />} />
            <Route path="/config/familia" element={<Familia />} />
            <Route path="/config/integrantes" element={<Integrantes />} />
        </Routes>
    );
}