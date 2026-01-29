import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import butLogout from "../../assets/config.png";
import butSair from "../../assets/sair.png";
import butMylistEventos from "../../assets/lista-de-controle.png";
import butCreatEventos from "../../assets/mais.png";
import butDashboard from "../../assets/painel-de-controle.png";
import menuImg from "../../assets/menu.png";
import "./styles.css";

//import logoImg from "../../assets/QRcode02.png"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(true);
  // Dados fictícios para visualizar o layout (depois virão do Backend)
  const eventosRecentes = [
    { id: 1, nome: "Treinamento Sefaz - Módulo 1", data: "28/01/2024", status: "Ativo" },
    { id: 2, nome: "Workshop de Integração", data: "05/02/2024", status: "Agendado" },
    { id: 3, nome: "Palestra: Segurança de Dados", data: "12/02/2024", status: "Concluído" },
  ];

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
          <button className="nav-item active" onClick={() => navigate ("/dashboard")}>
            <img src={butDashboard} alt="Dashboard" className="menu-icon"/>
            <span className={!menuAberto ? "escondido" : ""}>Dashboard</span>
          </button>
          
          <button className="nav-item" onClick={() => navigate("/eventos")}>
            <img src={butMylistEventos} alt="Meus Eventos" className="menu-icon"/>
            <span className={!menuAberto ? "escondido" : ""}>Meus Eventos</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/eventos/novo")}>
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

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="main-content">
        
        {/* Topo */}
        <header className="top-bar">
          <div className="user-info">
            <h1>Olá, Administrador</h1>
            <p>Bem-vindo de volta ao painel de controle.</p>
          </div>
          <div className="user-avatar">
            <span>AD</span> {/* Iniciais do usuário */}
          </div>
        </header>

        {/* Cards de Resumo */}
        <section className="stats-grid">
          <div className="card-stat">
            <h3>Eventos Ativos</h3>
            <p className="stat-number">3</p>
          </div>
          <div className="card-stat">
            <h3>Total Participantes</h3>
            <p className="stat-number">128</p>
          </div>
          <div className="card-stat highlight">
            <h3>Próximo Evento</h3>
            <p className="stat-text">Treinamento Sefaz</p>
            <small>Hoje, 14:00</small>
          </div>
        </section>

        {/* Lista de Eventos */}
        <section className="recent-events">
          <div className="section-header">
            <h2>Eventos Recentes</h2>
            <button className="btn-link" onClick={() => navigate("/events")}>Ver todos</button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome do Evento</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {eventosRecentes.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.nome}</td>
                    <td>{evento.data}</td>
                    <td>
                      <span className={`status-badge ${evento.status.toLowerCase()}`}>
                        {evento.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-action">Detalhes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}