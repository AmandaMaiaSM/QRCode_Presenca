import React, { useState, useRef } from "react";
import QRCode from "react-qr-code"; // Gerador do QR Code
import { toPng } from "html-to-image"; // Para baixar a imagem
import Sidebar from "../../components/Sidebar";
import "./styles.css";

export default function CreateEvent() {
  const qrCodeRef = useRef(null); 

  // 1. Gerar um ID único assim que a tela abre (Data atual + número aleatório)
  // Isso garante que o QR Code seja único para este evento específico.

  const [eventoId] = useState(() => `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    location: ""
  });

  // Atualiza os dados do formulário
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Evento Criado! O QR Code está pronto para download.");
    // no Banco de Dados enviando 'form' e 'eventoId'
  };

  // Função para baixar o QR Code como imagem PNG
  const downloadQRCode = () => {
    if (qrCodeRef.current === null) {
      return;
    }

    toPng(qrCodeRef.current, { cacheBust: true, backgroundColor: 'white' })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${form.name || "evento"}-qrcode.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Erro ao gerar imagem do QR Code", err);
      });
  };

  // Os dados que estarão DENTRO do QR Code (ID + Dados do Form)
  const qrValue = JSON.stringify({
    id: eventoId,
    ...form
  });

  return (
    <div className="dashboard-container">
      <Sidebar /> 
      
      <main className="main-content">
        <header className="page-header">
           <h1>Criar Novo Evento</h1>
           <p>Preencha os dados abaixo para gerar o QR Code de check-in.</p>
        </header>

        <div className="content-wrapper">
          
          {/* --- LADO DO FORMULÁRIO --- */}
          <section className="form-section">
            <form className="create-event-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome do Evento</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Ex: Workshop de React"
                  value={form.name}
                  onChange={handleChange}
                  required 
                />
              </div>  

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Data</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={form.date}
                    onChange={handleChange}
                    required 
                  />
                </div>  
                <div className="form-group">
                  <label htmlFor="time">Hora</label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time" 
                    value={form.time}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Local</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  placeholder="Ex: Auditório Principal"
                  value={form.location}
                  onChange={handleChange}
                  required 
                />
              </div>  

              <button type="submit" className="btn-submit">
                Salvar Evento
              </button>
            </form>
          </section>

          {/* --- LADO DA PRÉ-VISUALIZAÇÃO --- */}
          <aside className="preview-section">
            <h3>Pré-visualização do Ingresso</h3>
            
            <div className="event-card">
              <div className="card-header">
                 <span>TICKET DE ACESSO</span>
              </div>
              
              <div className="card-body">
                <h4>{form.name || "Nome do Evento"}</h4>
                
                <div className="card-info">
                  <p><strong>Data:</strong> {form.date || "--/--/----"}</p>
                  <p><strong>Hora:</strong> {form.time || "--:--"}</p>
                  <p><strong>Local:</strong> {form.location || "Local não definido"}</p>
                  <p style={{fontSize: '10px', color: '#999', marginTop: '5px'}}>ID: {eventoId}</p>
                </div>

                {/* Área do QR Code que será baixada */}
                <div className="qr-container" ref={qrCodeRef}>
                   <QRCode 
                    value={form.name ? qrValue : "vazio"} 
                    size={140} 
                    level={"H"} 
                   />
                </div>
              </div>
              
              <div className="card-footer">
                <button 
                  type="button" 
                  className="btn-download" 
                  onClick={downloadQRCode}
                  disabled={!form.name} 
                >
                  Baixar QR Code
                </button>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}