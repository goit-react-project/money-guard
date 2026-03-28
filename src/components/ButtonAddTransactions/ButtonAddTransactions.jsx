import { useState } from 'react'

import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction'
import styles from './ButtonAddTransactions.module.css'

const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={styles.addTransactionButton}
        aria-label="Add transaction"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      {isModalOpen && (
        <ModalAddTransaction onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
export default ButtonAddTransactions
