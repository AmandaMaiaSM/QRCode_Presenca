import React from 'react';
import './styles.css';

const ModalDownload = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-success-content">
                <div></div>
                <h2>Download Realizado com Sucesso!</h2>
                <p>Sua lista de presença foi baixada com sucesso.</p>
                <button className="btn-success" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default ModalDownload;