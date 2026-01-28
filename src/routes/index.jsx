import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import CreateEvent from "../pages/CreateEvent";
import EventDetails from "../pages/EventDetails";
import QRCodePage from "../pages/QRCodePage";
import CheckIn from "../pages/CheckIn";
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
      <Route path="/eventos" element={<Events />} />
      <Route path="/eventos/novo" element={<CreateEvent />} />
      <Route path="/eventos/:id" element={<EventDetails />} />
      <Route path="/eventos/:id/qrcode" element={<QRCodePage />} />
      <Route path="/checkin/:eventId" element={<CheckIn />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="*" element={<div>404 - Página não encontrada</div>} />

    </Routes>
  );
}