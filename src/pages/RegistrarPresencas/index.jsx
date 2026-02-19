import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

export default function RegistrarPresencas() {
  const [participantes, setParticipantes] = useState([
    { nome: "", email: "", telefone: "" }
  ]);

  const handleAddParticipante = () => {
    setParticipantes([...participantes, { nome: "", email: "", telefone: "" }]);
  };

  // Função para remover um participante caso clicado sem querer
  const handleRemoveParticipante = (index) => {
    // Mantém pelo menos um formulário na tela
    if (participantes.length > 1) {
      const novosParticipantes = participantes.filter((_, i) => i !== index);
      setParticipantes(novosParticipantes);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const novosParticipantes = [...participantes];
    novosParticipantes[index][name] = value;
    setParticipantes(novosParticipantes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados salvos:", participantes);
    alert("Presenças registradas com sucesso!");
  };

  return (
    <div className="registrar-presencas-container">
      <Sidebar />

      <main className="registrar-presencas-main">
        <header className="page-header">
          <h1>Registrar Presenças</h1>
          <p>Registre as presenças manualmente abaixo.</p>
        </header>

        <section className="form-section">
          <form className="registrar-presenca-form" onSubmit={handleSubmit}>
            
            <div className="event-info">
              <h2>Informações do Evento</h2>
              <label htmlFor="evento">Nome do Evento:</label>
              <input type="text" id="evento" name="evento" placeholder="Nome do evento" required />
              
              <div className="form-row">
                <div>
                  <label htmlFor="data">Data:</label>
                  <input type="date" id="data" name="data" required />
                </div>
                <div>
                  <label htmlFor="hora">Hora:</label>
                  <input type="time" id="hora" name="hora" required />
                </div>
              </div>
            </div>

            {participantes.map((participante, index) => (
              <div key={index} className="participante-card">
                <div className="participante-header">
                  <h2>Participante {index + 1}</h2>
                  {participantes.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-remove" 
                      onClick={() => handleRemoveParticipante(index)}
                      title="Remover este participante"
                    >
                      ✖
                    </button>
                  )}
                </div>
                
                <div className="input-group">
                  <label>Nome Completo:</label>
                  <input 
                    type="text" 
                    name="nome" 
                    value={participante.nome}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Digite o nome" 
                    required 
                  />

                  <label>Email:</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={participante.email}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="exemplo@email.com" 
                    required 
                  />

                  <label>Telefone:</label>
                  <input 
                    type="tel" 
                    name="telefone" 
                    value={participante.telefone}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="(00) 00000-0000" 
                    required 
                  />
                </div>
              </div>
            ))}

            {/* Container de Botões Inferiores */}
            <div className="form-actions">
              <button type="button" className="btn-add" onClick={handleAddParticipante}>
                + Adicionar Outro Participante
              </button>

              <button type="submit" className="btn-save">
                Salvar Lista de Presença
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}