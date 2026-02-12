import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import MeusEvent from "../pages/MeusEvent";
import CreateEvent from "../pages/CreateEvent";
import CheckInPublic from "../pages/CheckInPublic";
import Config from "../pages/Config";
import Login from "../pages/Login";
import { MainPage } from "../pages/start";
import EsqueciSenha from "../pages/EsqueciSenha";
import RegistrarPresencas from "../pages/RegistrarPresencas";
import EmitirCertificado from "../pages/EmitirCertificado";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meusEventos" element={<MeusEvent />} />
      <Route path="/eventos/novo" element={<CreateEvent />} />
      <Route path="/checkin/:id" element={<CheckInPublic />} />
      <Route path="/config/:eventId" element={<Config />} />
      <Route path="/registrar-presencas" element={<RegistrarPresencas />} />
      <Route path="/emitir-certificado" element={<EmitirCertificado />} />
      
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="*" element={<div>404 - Página não encontrada</div>} />
    </Routes>
  );
}