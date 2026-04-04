import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HomeTab.module.css';
import TransactionsList from '../TransactionsList/TransactionsList';
import ButtonAddTransactions from '../ButtonAddTransactions/ButtonAddTransactions';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import {
  deleteTransaction,
  fetchTransactions,
  fetchCategories,
} from '../../redux/finance/financeOperations';

const HomeTab = () => {
  const transactions = useSelector((state) => state.finance.transactions) || [];

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenAdd = () => setIsAddOpen(true);
  const handleCloseAdd = () => setIsAddOpen(false);

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

  return (
    <div className={styles.wrapper}>
      <TransactionsList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleOpenEdit}
        onOpenAdd={handleOpenAdd}
      />
      <div className={styles.floatingButton}>
        <ButtonAddTransactions onClick={handleOpenAdd} />
      </div>
      {isAddOpen && <ModalAddTransaction onClose={handleCloseAdd} />}
      {isEditOpen && selectedTransaction && (
        <ModalEditTransaction
          isOpen={isEditOpen}
          transactionData={selectedTransaction}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default HomeTab;
