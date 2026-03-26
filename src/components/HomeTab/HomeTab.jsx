import styles from "./HomeTab.module.css";
import Navigation from "../Navigation/Navigation";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";
import TransactionsList from "../TransactionsList/TransactionsList";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";

const HomeTab = () => {
  return (
    <div className={styles.container}>
      {/* SOL PANEL */}
      <div className={styles.left}>
        <Navigation />
        <Balance />
        <Currency />
      </div>

      {/* AYRAÇ */}
      <div className={styles.divider}></div>

      {/* SAĞ PANEL */}
      <div className={styles.right}>
        <TransactionsList />
        <ButtonAddTransactions />
      </div>
    </div>
  );
};

export default HomeTab;