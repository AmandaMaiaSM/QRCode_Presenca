import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import MeusEvent from "../pages/MeusEvent";
import CreateEvent from "../pages/CreateEvent";
import MyEventDetails from "../pages/MyEventDetails";
import QRCodePage from "../pages/QRCodePage";
import Config from "../pages/Config";
import Login from "../pages/Login";
import { MainPage } from "../pages/start";
import EsqueciSenha from "../pages/EsqueciSenha";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meusEventos" element={<MeusEvent />} />
      <Route path="/eventos/novo" element={<CreateEvent />} />
      <Route path="/myEventDetails" element={<MyEventDetails />} />
      <Route path="/eventos/:id/qrcode" element={<QRCodePage />} />
      <Route path="/config/:eventId" element={<Config />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="*" element={<div>404 - Página não encontrada</div>} />
    </Routes>
  );
}
