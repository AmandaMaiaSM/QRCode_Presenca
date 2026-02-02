import React from 'react';
import './styles.css';

// Recebemos funções via props para fechar ou confirmar
const ModalConfirmacao = ({ isOpen, onClose, onConfirm, mensagem }) => {
  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Confirmação</h3>
        <p>{mensagem || "Tem certeza que deseja realizar esta ação?"}</p>
        
        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirmar" onClick={onConfirm}>
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;