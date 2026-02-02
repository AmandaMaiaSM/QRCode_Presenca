import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

export default function Config() {
  // Estado para simular os dados do usuário
  const [perfil, setPerfil] = useState({
    nome: "Amanda Maia Soares",
    email: "amanda.maia@sefaz.ma.gov.br",
    empresa: "Sefaz MA",
    notificacoes: true,
    temaEscuro: false
  });

  const [senhas, setSenhas] = useState({
    atual: "",
    nova: "",
    confirmar: ""
  });

  // Função genérica para atualizar os inputs de texto
  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  // Função para checkboxes (toggles)
  const handleToggle = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.checked });
  };

  const handleSenhaChange = (e) => {
    setSenhas({ ...senhas, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <header className="page-header">
          <h1>Configurações</h1>
          <p>Gerencie seus dados e preferências da conta.</p>
        </header>

        <div className="settings-grid">
          
          {/* CARD 1: PERFIL */}
          <section className="settings-card">
            <div className="card-header-settings">
              <h3>👤 Meus Dados</h3>
            </div>
            <div className="card-body-settings">
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input 
                    type="text" 
                    name="nome" 
                    value={perfil.nome} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={perfil.email} 
                    onChange={handleChange} 
                    disabled // Geralmente não deixamos mudar o email fácil
                    className="input-disabled"
                  />
                </div>

                <div className="form-group">
                  <label>Nome da Organização (Aparece no Ingresso)</label>
                  <input 
                    type="text" 
                    name="empresa" 
                    value={perfil.empresa} 
                    onChange={handleChange} 
                    placeholder="Ex: Minha Empresa Ltda"
                  />
                </div>

                <button type="submit" className="btn-save">Salvar Alterações</button>
              </form>
            </div>
          </section>

          {/* CARD 2: SEGURANÇA */}
          <section className="settings-card">
            <div className="card-header-settings">
              <h3>🔒 Segurança</h3>
            </div>
            <div className="card-body-settings">
              <div className="form-group">
                <label>Senha Atual</label>
                <input 
                  type="password" 
                  name="atual" 
                  placeholder="••••••"
                  onChange={handleSenhaChange}
                />
              </div>
              <div className="form-group">
                <label>Nova Senha</label>
                <input 
                  type="password" 
                  name="nova" 
                  placeholder="Nova senha segura"
                  onChange={handleSenhaChange}
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  name="confirmar" 
                  placeholder="Repita a nova senha"
                  onChange={handleSenhaChange}
                />
              </div>
              <button className="btn-save outline">Atualizar Senha</button>
            </div>
          </section>

          {/* CARD 3: PREFERÊNCIAS */}
          <section className="settings-card">
            <div className="card-header-settings">
              <h3>⚙️ Preferências do Sistema</h3>
            </div>
            <div className="card-body-settings">
              
              <div className="toggle-option">
                <div className="toggle-info">
                  <strong>Notificações por Email</strong>
                  <p>Receber aviso quando alguém fizer check-in.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name="notificacoes" 
                    checked={perfil.notificacoes}
                    onChange={handleToggle}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </section>

          {/* CARD 4: ZONA DE PERIGO */}
          <section className="settings-card danger-zone">
            <div className="card-header-settings">
              <h3>Zona de Perigo</h3>
            </div>
            <div className="card-body-settings">
              <p>Uma vez deletada, sua conta não pode ser recuperada.</p>
              <button 
                className="btn-delete"
                onClick={() => confirm("Tem certeza? Isso apagará todos os eventos.")}
              >
                Excluir Conta
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}