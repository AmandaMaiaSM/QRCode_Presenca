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
  const [idParticipanteEditando, setIdParticipanteEditando] = useState(null);
  const [novoNomeParticipante, setNovoNomeParticipante] = useState("");


  // Estados para novo participante
  const [novoParticipante, setNovoParticipante] = useState({ nome: "", email: "", hora: "" });
  const [adicionarParticipanteAtivo, setAdicionarParticipanteAtivo] = useState(false);
  // Adicionar participante ao evento selecionado
  const handleAdicionarParticipante = () => {
    if (!novoParticipante.nome || !novoParticipante.email || !novoParticipante.hora) return;
    const novoId = Date.now();
    setEventos(prevEventos => prevEventos.map(ev => {
      if (ev.id === eventoSelecionado.id) {
        return {
          ...ev,
          participantes: [
            ...ev.participantes,
            { id: novoId, ...novoParticipante }
          ]
        };
      }
      return ev;
    }));
    setEventoSelecionado(ev => ({
      ...ev,
      participantes: [
        ...ev.participantes,
        { id: novoId, ...novoParticipante }
      ]
    }));
    setNovoParticipante({ nome: "", email: "", hora: "" });
    setAdicionarParticipanteAtivo(false);
  };

  const handleAbrirAdicionarParticipante = (pessoa) => {
    setNovoParticipante(pessoa ? { nome: pessoa.nome, email: pessoa.email, hora: pessoa.hora } : { nome: "", email: "", hora: "" });
    setAdicionarParticipanteAtivo(true);
  };

  const handleCancelarAdicionarParticipante = () => {
    setAdicionarParticipanteAtivo(false);
    setNovoParticipante({ nome: "", email: "", hora: "" });
  };


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

  //modal de ModalDanload para baixar a lista de presença do evento selecionado
  const handleVerPresenca = (evento) => {
    setEventoSelecionado(evento);
    setModalAberto(true);
    setIdParticipanteEditando(null);
    setNovoNomeParticipante("");
  };

  // Excluir participante
  const handleExcluirParticipante = (idParticipante) => {
    setEventos(prevEventos => prevEventos.map(ev => {
      if (ev.id === eventoSelecionado.id) {
        return {
          ...ev,
          participantes: ev.participantes.filter(p => p.id !== idParticipante)
        };
      }
      return ev;
    }));
    // Atualiza o evento selecionado para refletir a exclusão
    setEventoSelecionado(ev => ({
      ...ev,
      participantes: ev.participantes.filter(p => p.id !== idParticipante)
    }));
  };

  // Editar nome do participante
  const handleEditarParticipante = (idParticipante, nomeAtual) => {
    setIdParticipanteEditando(idParticipante);
    setNovoNomeParticipante(nomeAtual);
  };

  const handleSalvarNomeParticipante = (idParticipante) => {
    setEventos(prevEventos => prevEventos.map(ev => {
      if (ev.id === eventoSelecionado.id) {
        return {
          ...ev,
          participantes: ev.participantes.map(p =>
            p.id === idParticipante ? { ...p, nome: novoNomeParticipante } : p
          )
        };
      }
      return ev;
    }));
    setEventoSelecionado(ev => ({
      ...ev,
      participantes: ev.participantes.map(p =>
        p.id === idParticipante ? { ...p, nome: novoNomeParticipante } : p
      )
    }));
    setIdParticipanteEditando(null);
    setNovoNomeParticipante("");
  };

  const handleCancelarEdicaoParticipante = () => {
    setIdParticipanteEditando(null);
    setNovoNomeParticipante("");
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
        
        {/* Modal de Lista de Presença */}
        {modalAberto && eventoSelecionado && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Presenças: {eventoSelecionado.nome}</h2>
                <button className="btn-close" onClick={() => setModalAberto(false)}>✖</button>
              </div>
              <div className="modal-body">
                <>
                  {/* Formulário para adicionar participante (aparece só quando ativado) */}
                  {adicionarParticipanteAtivo && (
                    
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Nome"
                        value={novoParticipante.nome}
                        onChange={e => setNovoParticipante({ ...novoParticipante, nome: e.target.value })}
                        style={{ width: 120, padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={novoParticipante.email}
                        onChange={e => setNovoParticipante({ ...novoParticipante, email: e.target.value })}
                        style={{ width: 160, padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
                      />
                      <input
                        type="text"
                        placeholder="Hora (ex: 08:00)"
                        value={novoParticipante.hora}
                        onChange={e => setNovoParticipante({ ...novoParticipante, hora: e.target.value })}
                        style={{ width: 90, padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
                      />
                      <button className="btn-actionSalva" onClick={handleAdicionarParticipante} style={{ fontWeight: 'bold', fontSize: 16 }}>Adicionar</button>
                      <button className="btn-actionCAncelar" onClick={handleCancelarAdicionarParticipante} style={{ fontWeight: 'bold', fontSize: 16 }}>Cancelar</button>
                    </div>
                  )}
                  {eventoSelecionado.participantes.length > 0 ? (
                    <table className="attendees-table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Email</th>
                          <th>Hora Check-in</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody className="participantes-table-body">
                        {eventoSelecionado.participantes.map((pessoa) => (
                          <tr key={pessoa.id}>
                            <td>
                              {idParticipanteEditando === pessoa.id ? (
                                <>
                                  <input
                                    className="EditarNome"
                                    type="text"
                                    value={novoNomeParticipante}
                                    onChange={e => setNovoNomeParticipante(e.target.value)}
                                  />
                                  <button  className="btn-actionSalva" onClick={() => handleSalvarNomeParticipante(pessoa.id)} >Salvar</button>
                                  <button className="btn-actionCAncelar" onClick={handleCancelarEdicaoParticipante}>Cancelar</button>
                                </>
                              ) : (
                                pessoa.nome
                              )}
                            </td>
                            <td>{pessoa.email}</td>
                            <td>{pessoa.hora}</td>
                            <td>
                              <button className="btn-action" title= "Editar"  style={{marginLeft: 8}} onClick={() => handleEditarParticipante(pessoa.id, pessoa.nome)}>✏️</button>
                              <button className="btn-action" title = "Adicionar" onClick={() => handleAbrirAdicionarParticipante(pessoa)}>➕</button>
                              <button className="btn-action" title = "Excluir"  onClick={() => handleExcluirParticipante(pessoa.id)}>🗑️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="empty-modal">Ninguém realizou check-in ainda.</p>
                  )}
                </>
              </div>
              <div className="modal-footer">
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