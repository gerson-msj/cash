import { Route, Routes } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Config from "../pages/Config";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/config" element={<Config />} />
            <Route path="/config/familia" element={<Familia />} />
            <Route path="/config/integrantes" element={<Integrantes />} />
        </Routes>
    );
}