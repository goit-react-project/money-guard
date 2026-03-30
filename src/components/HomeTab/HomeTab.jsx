import { /* useEffect, */ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeTab.module.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";
import CurrencyTab from "../CurrencyTab/CurrencyTab";
import TransactionsList from "../TransactionsList/TransactionsList";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
 // fetchTransactions,
} from "../../redux/finance/financeOperations";


const mockTransactions = [
  {
    id: "1",
    transactionDate: "2023-01-04",
    type: "-",
    category: "Other",
    comment: "Gift for your wife",
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
  const transactions = useSelector((state) => state.finance.transactions);
  const displayedTransactions =transactions && transactions.length > 0 ? transactions : mockTransactions;
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
      <Header />
     <div className={styles.content}>
      <div className={styles.topSection}>
        <div className={styles.leftSide}>
          <Navigation />
          <Currency />
          <Balance />
        </div>

        <div className={styles.rightSide}>
            <CurrencyTab />
        </div>
      </div>

      <div className={styles.bottomSection}>
        <TransactionsList
          transactions={displayedTransactions}
          onDelete={handleDelete}
          onEdit={handleOpenEdit}
          onOpenAdd={handleOpenAdd}
        />

        <ButtonAddTransactions onAddTransaction={handleOpenAdd} />
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