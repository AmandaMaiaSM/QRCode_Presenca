import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";


export default function CheckInPublic() {
  const { id } = useParams();
  const [sucesso, setSucesso] = useState(false);
  const [state, setState] = useState(() => {
    const eventos = JSON.parse(localStorage.getItem('meus_eventos') || '[]');
    const eventoEncontrado = eventos.find(e => e.id === id);
    if (eventoEncontrado) {
      const initialForm = { nome: "", email: "", telefone: "" };
      eventoEncontrado.camposPersonalizados?.forEach(campo => {
        initialForm[campo.name] = "";
      });
      return { configEvento: eventoEncontrado, form: initialForm };
    }
    return { configEvento: null, form: {} };
  });


  // Atualiza o form sem recriar configEvento
  const handleChange = (e) => {
    setState(prev => ({ ...prev, form: { ...prev.form, [e.target.name]: e.target.value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Participante registrado no evento:", id, state.form);
    setSucesso(true);
  };

  if (sucesso) {
    return (
      <div className="checkin-container success">
        <div className="success-card">
          <h1>Presença Confirmada!</h1>
          <p>Obrigado, <strong>{state.form.nome}</strong>.</p>
          <p>Registrado com sucesso.</p>
        </div>
      </div>
    );
  }

  if (!state.configEvento) {
    return <div className="checkin-container">Evento não encontrado ou carregando...</div>;
  }

  return (
    <div className="checkin-container">
      <div className="checkin-card">
        <header className="checkin-header">
          <h2>Bem-vindo(a)!</h2>
          <p>Confirme sua presença em: <strong>{state.configEvento.nome}</strong></p>
          {state.configEvento.descricao && (
            <div
              style={{ marginTop: 8, color: '#444', fontStyle: 'italic', whiteSpace: 'pre-line' }}
            >
              {state.configEvento.descricao}
            </div>
          )}
          <span className="event-id-badge">ID: {id}</span>
        </header>

        <form onSubmit={handleSubmit} className="checkin-form">
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" name="nome" required value={state.form.nome || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input type="email" name="email" required value={state.form.email || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Telefone / WhatsApp</label>
            <input type="tel" name="telefone" required value={state.form.telefone || ""} onChange={handleChange} />
          </div>

          {state.configEvento.camposPersonalizados?.map((campo) => (
            <div className="form-group" key={campo.id}>
              <label>{campo.label}</label>
              <input 
                type="text" 
                name={campo.name} 
                placeholder={`Digite seu ${campo.label}`}
                required 
                value={state.form[campo.name] || ""} 
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