import { Route, Routes } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    );
}