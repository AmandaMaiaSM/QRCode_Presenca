import React, { useRef } from 'react';
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import './styles.css';

const ModalQRCode = ({ isOpen, onClose, qrValue, nomeEvento }) => {
  const qrRef = useRef(null);

  if (!isOpen) return null;

  const baixarQR = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current, { cacheBust: true, backgroundColor: 'white', padding: 20 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `qrcode-${nomeEvento}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("Erro ao baixar QR Code", err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>QR Code: {nomeEvento}</h3>
        
        {/* Container que será capturado para a imagem */}
        <div ref={qrRef} className="qr-display-area" style={{ background: 'white', padding: '20px' }}>
          <QRCode value={qrValue} size={200} />
        </div>

        <div className="modal-buttons">
          <button className="btn-secondary" onClick={onClose}>Fechar</button>
          <button className="btn-confirmar" onClick={baixarQR}>
            Baixar Imagem
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalQRCode;