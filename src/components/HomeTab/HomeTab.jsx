import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HomeTab.module.css';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';
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
              <ButtonAddTransactions />
            </div>
          </div>
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
    </div>
  );
};

export default HomeTab;
