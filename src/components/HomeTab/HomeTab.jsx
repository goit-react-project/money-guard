import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeTab.module.css";
import Navigation from "../Navigation/Navigation";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";
import TransactionsList from "../TransactionsList/TransactionsList";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../../redux/finance/financeOperations";



const HomeTab = () => {
  const transactions = useSelector((state) => state.finance.transactions);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const dispatch = useDispatch();

  
  const handleAddTransaction = (newTransaction) => {
    dispatch(addTransaction(newTransaction));
  }; 

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const handleOpenEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setSelectedTransaction(null);
    setIsEditOpen(false);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
  const { id, ...data } = updatedTransaction;

  dispatch(editTransaction({ id, data }));
  handleCloseEdit();
};

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Navigation />
        <Balance />
        <Currency />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.right}>
        <TransactionsList
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={handleOpenEdit}
        />

        <ButtonAddTransactions onAddTransaction={handleAddTransaction} />
      </div>

      {isEditOpen && selectedTransaction && (
        <ModalEditTransaction
          transaction={selectedTransaction}
          onClose={handleCloseEdit}
          onSave={handleUpdateTransaction}
        />
      )}
    </div>
  );
};

export default HomeTab;