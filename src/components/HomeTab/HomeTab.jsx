import { /* useEffect, */ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeTab.module.css";
import Header from "../Header/Header";
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
 // fetchTransactions,
} from "../../redux/finance/financeOperations";



const HomeTab = () => {
  const transactions = useSelector((state) => state.finance.transactions);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const dispatch = useDispatch();

 /* useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);  */

  const handleOpenAdd = () => {
    setSelectedTransaction(null);
    setIsAddOpen(true);
  };

  const handleCloseAdd = () => {
    setIsAddOpen(false);
  };

  const handleAddTransaction = async (newTransaction) => {
    await dispatch(addTransaction(newTransaction));
    setIsAddOpen(false);
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

  const handleUpdateTransaction = async (updatedTransaction) => {
    const { id, ...data } = updatedTransaction;
    await dispatch(editTransaction({ id, data }));
    handleCloseEdit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Header />
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

        <ButtonAddTransactions onAddTransaction={handleOpenAdd} />
      </div>

      {isEditOpen && selectedTransaction && (
        <ModalEditTransaction
          transaction={selectedTransaction}
          onClose={handleCloseEdit}
          onSave={handleUpdateTransaction}
        />
      )}

      {isAddOpen && (
        <ModalEditTransaction
          transaction={null}
          onClose={handleCloseAdd}
          onSave={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default HomeTab;