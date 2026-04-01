import {  useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeTab.module.css";
import Navigation from "../Navigation/Navigation";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";
import TransactionsList from "../TransactionsList/TransactionsList";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction"
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
  fetchCategories,
} from "../../redux/finance/financeOperations";



const HomeTab = () => {
const transactions = useSelector((state) => state.finance.transactions) || [];

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);  

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
    <div className={styles.pageBg}>
      <div className={styles.container}>

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
              transactions={transactions}
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
    <div className={styles.homeTab}>
        {/* Home tab content */}
       </div> 
    </div>
  );
};

export default HomeTab;