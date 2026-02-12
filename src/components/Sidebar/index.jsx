import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import butLogout from "../../assets/config.png";
import butSair from "../../assets/sair.png";
import butMylistEventos from "../../assets/lista-de-controle.png";
import butCreatEventos from "../../assets/mais.png";
import butDashboard from "../../assets/painel-de-controle.png";
import menuImg from "../../assets/menu.png";
import butRegistrarPresencas from "../../assets/Registrar-Presencas.png";
import butEmitirCertificado from "../../assets/certificado.png";
import "./styles.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(true);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/") 
      ? "nav-item active" 
      : "nav-item";
  };

  return (
    <aside className={`sidebar ${menuAberto ? "" : "fechada"}`}>
      <div className="sidebar-header">
        <img 
          src={menuImg} 
          alt="Menu" 
          className="menu-icon"
          onClick={() => setMenuAberto(!menuAberto)} 
        />
        <h2 className={!menuAberto ? "escondido" : ""}>QR Presença</h2>
      </div>

      <nav className="sidebar-nav">
        <button className={isActive("/dashboard")} onClick={() => navigate("/dashboard")}>
          <img src={butDashboard} alt="Dashboard" className="menu-icon-nav"/>
          <span className={!menuAberto ? "escondido" : ""}>Dashboard</span>
        </button>
        
        <button className={isActive("/meusEventos")} onClick={() => navigate("/meusEventos")}>
          <img src={butMylistEventos} alt="Meus Eventos" className="menu-icon-nav"/>
          <span className={!menuAberto ? "escondido" : ""}>Meus Eventos</span>
        </button>

        <button className={isActive("/eventos/novo")} onClick={() => navigate("/eventos/novo")}>
            <img src={butCreatEventos} alt="Criar Evento" className="menu-icon-nav"/>
            <span className={!menuAberto ? "escondido" : ""}>Criar Evento</span>
        </button>

        <button className={isActive("/registrar-presencas")} onClick={() => navigate("/registrar-presencas")}>
            <img src={butRegistrarPresencas} alt="Registrar Presenças" className="menu-icon-nav"/>
            <span className={!menuAberto ? "escondido" : ""}>Registrar Presenças</span>
        </button> 
        
        <button className={isActive("/emitir-certificado")} onClick={() => navigate("/emitir-certificado")}>
            <img src={butEmitirCertificado} alt="Emitir Certificados" className="menu-icon-nav"/>
            <span className={!menuAberto ? "escondido" : ""}>Emitir Certificados</span>
        </button>
      
        <button className={isActive("/config/1")} onClick={() => navigate("/config/1")}>
          <img src={butLogout} alt="Configurações" className="menu-icon-nav"/>
          <span className={!menuAberto ? "escondido" : ""}>Configurações</span>
        </button>
      </nav>
      

      <div className="sidebar-footer">
        <button className="nav-item" onClick={() => navigate("/login")}>
          <img src={butSair} alt="Sair" className="menu-icon-nav"/>
          <span className={!menuAberto ? "escondido" : ""}>Sair</span>
        </button>
      </div>
      
    </aside>
  );
}