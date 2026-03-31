import React, { useEffect } from 'react';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';
import css from './ModalEditTransaction.module.css';
import closeIcon from '../../assets/icons/close.svg';

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
      if (isOpen) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose]);

  // Arka plana tıklayarak kapatma - backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !transactionData) return null;

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.closeBtn} onClick={onClose} type="button">
          <img src={closeIcon} alt="Close modal" width="16" height="16" />
        </button>

        <h3 className={css.modalTitle}>Edit transaction</h3>

        <EditTransactionForm
          transaction={transactionData}
          closeModal={onClose}
        />
      </div>
    </div>
  );
};

export default ModalEditTransaction;
