import { useEffect } from 'react'

import AddTransactionForm from '../AddTransactionForm/AddTransactionForm'
import styles from './ModalAddTransaction.module.css'

const ModalAddTransaction = ({ onClose }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          <span className={styles.closeLine}></span>
          <span className={styles.closeLine}></span>
        </button>
        <h2 className={styles.modalTitle}>Add transaction</h2>
        <AddTransactionForm onSuccess={onClose} />
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
export default ModalAddTransaction
