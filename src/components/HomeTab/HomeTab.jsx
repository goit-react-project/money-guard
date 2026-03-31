import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeTab.module.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";
import CurrencyTab from "../CurrencyTab/CurrencyTab";
import TransactionsList from "../TransactionsList/TransactionsList";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../../redux/finance/financeOperations";

const initialMockTransactions = [
  {
    id: "1",
    transactionDate: "2023-01-04",
    type: "-",
    category: "Other",
    comment: "Gift for your wifes",
    amount: 300.0,
  },
  {
    id: "2",
    transactionDate: "2023-01-04",
    type: "+",
    category: "Income",
    comment: "January bonus",
    amount: 8000.0,
  },
  {
    id: "3",
    transactionDate: "2023-01-04",
    type: "-",
    category: "Car",
    comment: "Oil",
    amount: 1000.0,
  },
];

const HomeTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.finance.transactions);

  const [mockTransactions, setMockTransactions] = useState(initialMockTransactions);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const isMockMode = !transactions || transactions.length === 0;
  const displayedTransactions = isMockMode ? mockTransactions : transactions;

  const handleOpenAdd = () => {
    setSelectedTransaction(null);
    setIsAddOpen(true);
  };

  const handleCloseAdd = () => {
    setIsAddOpen(false);
  };

  const handleAddTransaction = async (newTransaction) => {
    if (isMockMode) {
      const mockItem = {
        ...newTransaction,
        id: Date.now().toString(),
      };
      setMockTransactions((prev) => [mockItem, ...prev]);
      setIsAddOpen(false);
      return;
    }

    await dispatch(addTransaction(newTransaction));
    setIsAddOpen(false);
  };

  const handleDelete = (id) => {
    if (isMockMode) {
      setMockTransactions((prev) => prev.filter((item) => item.id !== id));
      return;
    }

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
    if (isMockMode) {
      setMockTransactions((prev) =>
        prev.map((item) =>
          item.id === updatedTransaction.id ? updatedTransaction : item
        )
      );
      handleCloseEdit();
      return;
    }

    const { id, ...data } = updatedTransaction;
    await dispatch(editTransaction({ id, data }));
    handleCloseEdit();
  };
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div className={styles.topSection}>
          <div className={styles.leftSide}>
             <div className={styles.navWrap}>
                <Navigation />
             </div>
             <div className={styles.balanceWrap}>
                <Balance />
             </div>
             <div className={styles.currencyWrap}>
                <Currency />
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.rightTop}>
              <Currency />
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <TransactionsList
            transactions={displayedTransactions}
            onDelete={handleDelete}
            onEdit={handleOpenEdit}
            onOpenAdd={handleOpenAdd}
          />

          <div className={styles.floatingButton}>
            <ButtonAddTransactions onAddTransaction={handleOpenAdd} />
          </div>
        </div>
      </div>

      {isEditOpen && selectedTransaction && (
        <ModalEditTransaction
          transaction={selectedTransaction}
          onClose={handleCloseEdit}
          onSave={handleUpdateTransaction}
        />
      )}

     {isAddOpen && (
  <ModalAddTransaction
    onClose={handleCloseAdd}
    onSave={handleAddTransaction}
  />
)}
    </div>
  );
};

export default HomeTab;