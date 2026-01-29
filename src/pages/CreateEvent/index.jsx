import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import butLogout from "../../assets/config.png";
import butSair from "../../assets/sair.png";
import butMylistEventos from "../../assets/lista-de-controle.png";
import butCreatEventos from "../../assets/mais.png";
import butDashboard from "../../assets/painel-de-controle.png";
import menuImg from "../../assets/menu.png";
import "./styles.css";


export default function CreateEvent() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(true);

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${menuAberto ? "" : "fechada"}`}>
        
        <div className="sidebar-header">
          {/* 4. Adicionar o onClick na imagem */}
          <img 
            src={menuImg} 
            alt="Menu" 
            className="menu-icon"
            onClick={() => setMenuAberto(!menuAberto)} 
          />
          
          {/* O texto só aparece se o menu estiver aberto */}
          <h2 className={!menuAberto ? "escondido" : ""}>QR Presença</h2>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate ("/dashboard")}>
            <img src={butDashboard} alt="Dashboard" className="menu-icon"/>
            <span className={!menuAberto ? "escondido" : ""}>Dashboard</span>
          </button>
          
          <button className="nav-item" onClick={() => navigate("/eventos")}>
            <img src={butMylistEventos} alt="Meus Eventos" className="menu-icon"/>
            <span className={!menuAberto ? "escondido" : ""}>Meus Eventos</span>
          </button>

          <button className="nav-item active" onClick={() => navigate("/eventos/novo")}>
             <img src ={butCreatEventos} alt="Criar Evento" className="menu-icon"/>
             <span className={!menuAberto ? "escondido" : ""}>Criar Evento</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/config/1")}>
            
            <img src={butLogout} alt="Configurações" className="menu-icon"/>
            <span className={!menuAberto ? "escondido" : ""}>Configurações</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => navigate("/mainPage")}>
            <img src={butSair} alt="Sair" className="menu-icon"/>
            <span className={!menuAberto ? "escondido" : ""}>Sair</span>
          </button>
        </div>
      </aside>      
  
    </div>
  );
}