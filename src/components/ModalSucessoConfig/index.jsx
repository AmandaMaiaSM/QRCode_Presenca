import React from 'react';
import './styles.css';

const ModalSucessoConfig = ({ isOpen, onClose, mensagem }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container success-modal">
        <div className="success-icon"></div>
        <h2>Sucesso!</h2>
        <p>{mensagem}</p>
        <div className="modal-buttons">
          <button className="btn-confirmar" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSucessoConfig;