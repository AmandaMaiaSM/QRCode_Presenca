import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Para pegar o ID do evento na URL
import "./styles.css";

export default function CheckInPublic() {
  const { id } = useParams(); 
  const [sucesso, setSucesso] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //  BANCO DE DADOS
    console.log("Dados recebidos do evento:", id);
    console.log("Participante:", form);

    // Se deu certo ou  o sucesso
    setSucesso(true);
  };

  if (sucesso) {
    return (
      <div className="checkin-container success">
        <div className="success-card">
          <div className="icon-check"></div>
          <h1>Presença Confirmada!</h1>
          <p>Obrigado, <strong>{form.nome}</strong>.</p>
          <p>Registrado com sucesso.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkin-container">
      <div className="checkin-card">
        <header className="checkin-header">
          <h2>Bem-vindo(a)!</h2>
          <p>Confirme sua presença no evento.</p>
          <span className="event-id-badge">ID do Evento: {id}</span>
        </header>

        <form onSubmit={handleSubmit} className="checkin-form">
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              type="text" 
              name="nome" 
              placeholder="Digite seu nome" 
              required 
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              name="email" 
              placeholder="seu@email.com" 
              required 
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Telefone / WhatsApp</label>
            <input 
              type="tel" 
              name="telefone" 
              placeholder="(xx) 9xxxx-xxxx" 
              required 
              value={form.telefone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-confirm">
            CONFIRMAR PRESENÇA
          </button>
        </form>
      </div>
    </div>
  );
}