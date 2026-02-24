import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

export default function CheckInPublic() {
  const { id } = useParams();
  const [sucesso, setSucesso] = useState(false);
  const [configEvento, setConfigEvento] = useState(null);
  const [form, setForm] = useState({}); // Começa como objeto vazio

  // 1. Carrega o evento ao mudar o id
  useEffect(() => {
    const eventos = JSON.parse(localStorage.getItem('meus_eventos') || '[]');
    const eventoEncontrado = eventos.find(e => e.id === id);
    setConfigEvento(eventoEncontrado || null);
  }, [id]);

  // 2. Inicializa o form quando configEvento mudar
  useEffect(() => {
    if (!configEvento) return;
    const initialForm = { nome: "", email: "", telefone: "" };
    configEvento.camposPersonalizados?.forEach(campo => {
      initialForm[campo.name] = "";
    });
    setForm(initialForm);
  }, [configEvento]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aqui você enviaria 'form' para o banco. 
    // Ele já contém NOME, EMAIL, TELEFONE + CAMPOS EXTRAS.
    console.log("Participante registrado no evento:", id, form);

    setSucesso(true);
  };

  if (sucesso) {
    return (
      <div className="checkin-container success">
        <div className="success-card">
          <h1>Presença Confirmada!</h1>
          <p>Obrigado, <strong>{form.nome}</strong>.</p>
          <p>Registrado com sucesso.</p>
        </div>
      </div>
    );
  }

  // Caso o evento não seja encontrado
  if (!configEvento) {
    return <div className="checkin-container">Evento não encontrado ou carregando...</div>;
  }

  return (
    <div className="checkin-container">
      <div className="checkin-card">
        <header className="checkin-header">
          <h2>Bem-vindo(a)!</h2>
          <p>Confirme sua presença em: <strong>{configEvento.nome}</strong></p>
          <span className="event-id-badge">ID: {id}</span>
        </header>

        <form onSubmit={handleSubmit} className="checkin-form">
          {/* --- CAMPOS PADRÃO --- */}
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" name="nome" required value={form.nome || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input type="email" name="email" required value={form.email || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Telefone / WhatsApp</label>
            <input type="tel" name="telefone" required value={form.telefone || ""} onChange={handleChange} />
          </div>

          {/* --- CAMPOS DINÂMICOS (O que faltava) --- */}
          {configEvento.camposPersonalizados && configEvento.camposPersonalizados.map((campo) => (
            <div className="form-group" key={campo.id}>
              <label>{campo.label}</label>
              <input 
                type="text" 
                name={campo.name} 
                placeholder={`Digite seu ${campo.label}`}
                required 
                value={form[campo.name] || ""} 
                onChange={handleChange} 
              />
            </div>
          ))}

          <button type="submit" className="btn-confirm">
            CONFIRMAR PRESENÇA
          </button>
        </form>
      </div>
    </div>
  );
}