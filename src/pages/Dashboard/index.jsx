import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

//import logoImg from "../../assets/QRcode02.png"; 

export default function Dashboard() {
  const navigate = useNavigate();

  // Dados fictícios para visualizar o layout (depois virão do Backend)
  const eventosRecentes = [
    { id: 1, nome: "Treinamento Sefaz - Módulo 1", data: "28/01/2024", status: "Ativo" },
    { id: 2, nome: "Workshop de Integração", data: "05/02/2024", status: "Agendado" },
    { id: 3, nome: "Palestra: Segurança de Dados", data: "12/02/2024", status: "Concluído" },
  ];

  return (
    <div className="dashboard-container">
      
      {/* --- (Menu Lateral) --- */}
      <aside className="sidebar">
        <div className="sidebar-header" >
          <img src="../assets/menu.png" alt="Menu" />
        <h2>QR Presença</h2>

        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </button>
          
          <button className="nav-item" onClick={() => navigate("/events")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Meus Eventos
          </button>

          <button className="nav-item" onClick={() => navigate("/create-event")}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Criar Evento
          </button>

          <button className="nav-item" onClick={() => navigate("/checkin")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>
            Realizar Check-in
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={() => navigate("/login")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sair
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