import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

export default function RegistrarPresencas() {
  // Estado para armazenar a lista de participantes
  const [participantes, setParticipantes] = useState([
    { nome: "", email: "", telefone: "" }
  ]);

  // Função para adicionar um novo conjunto de campos de participante
  const handleAddParticipante = () => {
    setParticipantes([...participantes, { nome: "", email: "", telefone: "" }]);
  };

  // Função para atualizar os dados de um participante específico
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const novosParticipantes = [...participantes];
    novosParticipantes[index][name] = value;
    setParticipantes(novosParticipantes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados salvos:", participantes);
    alert("Presenças registradas com sucesso! Redirecionando...");
    // lógica de navegação/modal
  };

  return (
    <div className="registrar-presencas-container">
      <Sidebar />

      <main className="registrar-presencas-main">
        <header className="page-header">
          <h1>Registrar Presenças</h1>
          <p>Aqui você pode registrar as presenças dos participantes manualmente.</p>
        </header>

        <section className="form-section">
          <form className="registrar-presenca-form" onSubmit={handleSubmit}>
            
            <div className="event-info">
              <h2>Informações do Evento</h2>
              <label htmlFor="evento">Nome do Evento:</label>
              <input type="text" id="evento" name="evento" placeholder="Digite o nome do evento" required />
              
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

            {/* Mapeamento dos participantes dinamicamente */}
            {participantes.map((participante, index) => (
              <div key={index} className="participante-group">
                <h2>Informações do Participante {index + 1}</h2>
                
                <label>Nome Completo:</label>
                <input 
                  type="text" 
                  name="nome" 
                  value={participante.nome}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Digite o nome completo" 
                  required 
                />

                <label>Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  value={participante.email}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Digite o email" 
                  required 
                />

                <label>Telefone:</label>
                <input 
                  type="tel" 
                  name="telefone" 
                  value={participante.telefone}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Digite o telefone" 
                  required 
                />
              </div>
            ))}

            <button type="button" className="btn-add" onClick={handleAddParticipante}>
              + Adicionar Outro Participante
            </button>

            <button type="submit" className="btn-save">
              Salvar Lista de Presença
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}