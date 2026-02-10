import React, { useState, useEffect, useMemo } from "react";

import ModalQRCode from "../../components/ModalQRCode";
import ModalConfirmacao from "../../components/ModalConfirmacao"; 
import ModalEditarEvento from "../../components/ModalEditarEvento";
import ModalDownload from "../../components/ModalDanload";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

// --- DADOS FICTÍCIOS ---
const eventosIniciais = [
  {
    id: 1,
    nome: "Workshop de React",
    data: "2023-10-25",
    local: "Auditório Principal",
    participantes: [
      { id: 101, nome: "João Silva", email: "joao@email.com", hora: "08:30" },
      { id: 102, nome: "Maria Oliveira", email: "maria@email.com", hora: "08:45" },
    ]
  },
  {
    id: 2,
    nome: "Palestra de Segurança",
    data: "2023-11-10",
    local: "Sala de Reunião B",
    qrCodeValue: "http://localhost:5173/checkin/evt-1",
    participantes: [
      { id: 201, nome: "Ana Santos", email: "ana@email.com", hora: "14:05" },
    ]
  }
];

export default function MeusEvent() {
  // --- ESTADOS ---
  const [eventos, setEventos] = useState(() => {
    const salvos = localStorage.getItem('meus_eventos');
    return salvos ? JSON.parse(salvos) : eventosIniciais;
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [dadosEdicao, setDadosEdicao] = useState({ id: null, nome: '', data: '' });
  const [modalQrAberto, setModalQrAberto] = useState(false);
  const [qrValueSelecionado, setQrValueSelecionado] = useState("");
  const [nomeEventoQr, setNomeEventoQr] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [modalDownloadAberto, setModalDownloadAberto] = useState(false);  


  // --- EFEITOS ---
  // Salva no localStorage sempre que a lista de eventos mudar
  useEffect(() => {
    localStorage.setItem('meus_eventos', JSON.stringify(eventos));
  }, [eventos]);

  // LÓGICA DE FILTRAGEM  
  const eventosFiltrados = useMemo(() => {
    const termo = termoPesquisa.toLowerCase();
    return eventos.filter(evento => {
      const nome = (evento.nome || "").toLowerCase();
      const local = (evento.local || "").toLowerCase();
      const dataIso = evento.data || "";
      const dataFormatada = new Date(dataIso).toLocaleDateString('pt-BR');

      return (
        nome.includes(termo) ||
        local.includes(termo) ||
        dataIso.includes(termo) ||
        dataFormatada.includes(termo)
      );
    });
  }, [eventos, termoPesquisa]);

  // FUNÇÕES DE AÇÃO
  const handleAbrirEdicao = (evento) => {
    setDadosEdicao({ id: evento.id, nome: evento.nome, data: evento.data });
    setModalEditarAberto(true);
  };

  const handleAbrirConfirmacao = (id) => {
    setIdParaExcluir(id);
    setModalExcluirAberto(true);
  };

  const confirmarExclusao = () => {
    setEventos(prev => prev.filter(ev => ev.id !== idParaExcluir));
    setModalExcluirAberto(false);
    setIdParaExcluir(null);
  };

  const salvarEdicao = () => {
    setEventos(prev => prev.map(ev => 
      ev.id === dadosEdicao.id ? { ...ev, nome: dadosEdicao.nome, data: dadosEdicao.data } : ev
    ));
    setModalEditarAberto(false);
  };

  const handleVerPresenca = (evento) => {
    setEventoSelecionado(evento);
    setModalAberto(true);
  };

  const handleVerQRCode = (evento) => {
    setQrValueSelecionado(evento.qrCodeValue || "");
    setNomeEventoQr(evento.nome);
    setModalQrAberto(true);
  };
   

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <header className="page-header">
          <h1>Meus Eventos</h1>
          <p>Gerencie seus eventos e veja quem marcou presença.</p>
        </header>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Pesquisar por nome, local ou data..." 
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="events-table">
            <thead>
              <tr>
                <th>Nome do Evento</th>
                <th>Data</th>
                <th>Local</th>
                <th>Qtd. Presentes</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventosFiltrados.map((evento) => (
                <tr key={evento.id}>
                  <td><strong>{evento.nome}</strong></td>
                  <td>{new Date(evento.data).toLocaleDateString('pt-BR')}</td>
                  <td>{evento.local}</td>
                  <td>
                    <span className="badge-count">
                      {evento.participantes?.length || 0} pessoas
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-action qr" onClick={() => handleVerQRCode(evento)} title="Ver QR Code">
                      <img src="/src/assets/QRCODE.svg" alt="QR" />
                    </button>

                    <button className="btn-action view" onClick={() => handleVerPresenca(evento)} title="Ver Lista">
                      Ver Lista
                    </button>

                    <button className="btn-action edit" onClick={() => handleAbrirEdicao(evento)} title="Editar">
                      ✏️
                    </button>

                    <button className="btn-action delete" onClick={() => handleAbrirConfirmacao(evento.id)} title="Excluir">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {eventosFiltrados.length === 0 && (
            <p className="empty-state">Nenhum evento encontrado para sua busca.</p>
          )}
        </div>

        {/* --- MODAIS --- */}
        
        {/* Modal de Lista de Presença */}
        {modalAberto && eventoSelecionado && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Presenças: {eventoSelecionado.nome}</h2>
                <button className="btn-close" onClick={() => setModalAberto(false)}>✖</button>
              </div>
              <div className="modal-body">
                {eventoSelecionado.participantes.length > 0 ? (
                  <table className="attendees-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Hora Check-in</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventoSelecionado.participantes.map((pessoa) => (
                        <tr key={pessoa.id}>
                          <td>{pessoa.nome}</td>
                          <td>{pessoa.email}</td>
                          <td>{pessoa.hora}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="empty-modal">Ninguém realizou check-in ainda.</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setModalAberto(false)}>Fechar</button>
                <button className="btn-primary" onClick={() => setModalDownloadAberto(true)}>Baixar Lista</button>
              </div>
            </div>
          </div>
        )}

        <ModalConfirmacao 
          isOpen={modalExcluirAberto}
          onClose={() => setModalExcluirAberto(false)}
          onConfirm={confirmarExclusao}
          mensagem="Você tem certeza que deseja excluir permanentemente este evento?"
        />

        <ModalEditarEvento 
          isOpen={modalEditarAberto}
          onClose={() => setModalEditarAberto(false)}
          onSave={salvarEdicao}
          dadosEdicao={dadosEdicao}
          setDadosEdicao={setDadosEdicao}
        />

        <ModalQRCode 
          isOpen={modalQrAberto} 
          onClose={() => setModalQrAberto(false)} 
          qrValue={qrValueSelecionado}
          nomeEvento={nomeEventoQr}
        />

        <ModalDownload 
          isOpen={modalDownloadAberto}
          onClose={() => setModalDownloadAberto(false)}
        />

      </main>
    </div>
  );
}