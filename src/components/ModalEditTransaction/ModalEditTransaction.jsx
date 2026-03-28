import React, { useEffect } from 'react';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';

const ModalEditTransaction = ({ isOpen, onClose, transactionData }) => {
  // ESC ile kapatma ve arka plan scroll kilidi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Kilitle
    }

    // Bileşen ekrandan kalktıktan sonra event listenerı temizler ve scrollu açar
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Kilidi kaldır
    };
  }, [isOpen, onClose]);

  // Arka plana tıklayarak kapatma - backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} type="button">
          X
        </button>

        <h3 className="modal-title">Edit transaction</h3>

        <EditTransactionForm
          transaction={transactionData}
          closeModal={onClose}
        />
      </div>
    </div>
  );
};

export default ModalEditTransaction;
