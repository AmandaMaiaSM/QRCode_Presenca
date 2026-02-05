import React, { useState } from "react";

import ModalQRCode from "../../components/ModalQRCode";
import ModalConfirmacao from "../../components/ModalConfirmacao"; 
import ModalEditarEvento from "../../components/ModalEditarEvento";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

// --- DADOS FICTÍCIOS (Para simular o Banco de Dados) ---
const eventosIniciais = [
  {
    id: 1,
    nome: "Workshop de React",
    data: "2023-10-25",
    local: "Auditório Principal",
    participantes: [
      { id: 101, nome: "João Silva", email: "joao@email.com", hora: "08:30" },
      { id: 102, nome: "Maria Oliveira", email: "maria@email.com", hora: "08:45" },
      { id: 103, nome: "Carlos Souza", email: "carlos@email.com", hora: "09:00" },
    ]
  },
  {
    id: 2,
    nome: "Palestra de Segurança",
    data: "2023-11-10",
    local: "Sala de Reunião B",
    qrCodeValue: "http://localhost:5173/checkin/evt-1", // Exemplo
    participantes: [
      { id: 201, nome: "Ana Santos", email: "ana@email.com", hora: "14:05" },
      { id: 202, nome: "Pedro Lima", email: "pedro@email.com", hora: "14:10" },
    ]
  },
  {
    id: 3,
    nome: "Hackathon 2024",
    data: "2024-01-15",
    local: "Campus Tech",
    participantes: []
  }
];

export default function MeusEvent() {

  const [eventos, setEventos] = useState(() => {
    const salvos = localStorage.getItem('meus_eventos');
    return salvos ? JSON.parse(salvos) : eventosIniciais;
  });  

  // Estados para controlar o Modal (Janela de Participantes)
  const [modalAberto, setModalAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // Estados para controlar o Modal de Exclusão
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  // Estados para controlar o Modal de Edição
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [dadosEdicao, setDadosEdicao] = useState({ id: null, nome: '', data: '' });

  // Estados para controlar o Modal de QR Code
  const [modalQrAberto, setModalQrAberto] = useState(false);
  const [qrValueSelecionado, setQrValueSelecionado] = useState("");
  const [nomeEventoQr, setNomeEventoQr] = useState("");

  // --- FUNÇÕES ---
  
  const handleAbrirEdicao = (evento) => {
    
    setDadosEdicao({ 
      id: evento.id, 
      nome: evento.nome, 
      data: evento.data 
    });
  
    setModalEditarAberto(true); 
  };

  const handleAbrirConfirmacao = (id) => {
    setIdParaExcluir(id);
    setModalExcluirAberto(true);
  };

  
  const confirmarExclusao = () => {
    const novaLista = eventos.filter(evento => evento.id !== idParaExcluir);
    setEventos(novaLista);
    setModalExcluirAberto(false);
    setIdParaExcluir(null);
  };

  
  const handleVerPresenca = (evento) => {
    setEventoSelecionado(evento);
    setModalAberto(true);
  };

  
  const fecharModal = () => {
    setModalAberto(false);
    setEventoSelecionado(null);
  };

  
  const salvarEdicao = () => {
  const listaAtualizada = eventos.map(ev => 
    ev.id === dadosEdicao.id ? { ...ev, nome: dadosEdicao.nome, data: dadosEdicao.data } : ev
  );
  setEventos(listaAtualizada);
  setModalEditarAberto(false);
};

const handleVerQRCode = (evento) => {
  setQrValueSelecionado(evento.qrCodeValue);
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

        {/* TABELA DE EVENTOS */}
        <div className="table-container">
          <table className="events-table">
            <thead>
              <tr>
                <th>Nome do Evento</th>
                <th>Data</th>
                <th>Local</th>
                <th>Qtd. Presentes</th>
                <th style={{textAlign: 'center'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td><strong>{evento.nome}</strong></td>
                  <td>{new Date(evento.data).toLocaleDateString('pt-BR')}</td>
                  <td>{evento.local}</td>
                  <td>
                    <span className="badge-count">
                      {evento.participantes.length} pessoas
                    </span>
                  </td>
                  <td className="actions-cell">
                    {/* Botão para abrir o QR Code salvo */}
                    <button 
                      className="btn-action qr" 
                      onClick={() =>handleVerQRCode(evento)}
                      title="Ver QR Code"
                    >
                      <img src="/src/assets/QRCODE.svg" alt=" Ver QR Code" />
                    </button>

                    {/* Botão Ver Lista */}
                    <button 
                      className="btn-action view" 
                      onClick={() => handleVerPresenca(evento)}
                      title="Ver Lista de Presença"
                    >
                      Ver Lista
                    </button>

                    {/* Botão Editar (Simulado) */}
                    <button 
                      className="btn-action edit"
                      onClick={() => handleAbrirEdicao(evento)}
                      title="Editar"
                    >
                      ✏️
                    </button>

                    {/* Botão Excluir */}
                    <button 
                      className="btn-action delete" 
                      onClick={() => handleAbrirConfirmacao(evento.id)}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {eventos.length === 0 && (
            <p className="empty-state">Nenhum evento encontrado.</p>
          )}
        </div>

        {/* --- MODAL (JANELA FLUTUANTE) --- */}
        {modalAberto && eventoSelecionado && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Presenças: {eventoSelecionado.nome}</h2>
                <button className="btn-close" onClick={fecharModal}>✖</button>
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
                  <p className="empty-modal">Ninguém realizou check-in neste evento ainda.</p>
                )}
              </div>
              
              <div className="modal-footer">
                <button className="btn-secondary" onClick={fecharModal}>Fechar</button>
                {/* Futuramente: Botão para baixar Excel/PDF */}
              </div>
            </div>
          </div>
        )}
        
        {/* --- MODAL DE CONFIRMAÇÃO DE EXCLUSÃO --- */}
        <ModalConfirmacao 
          isOpen={modalExcluirAberto}
          onClose={() => setModalExcluirAberto(false)}
          onConfirm={confirmarExclusao}
          mensagem="Você tem certeza que deseja excluir permanentemente este evento?"
        />

        {/* --- MODAL DE EDIÇÃO DE EVENTO --- */ }

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

      </main>
    </div>
    
  );
}

