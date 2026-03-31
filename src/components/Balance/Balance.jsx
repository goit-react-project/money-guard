import { useSelector } from "react-redux";
import { selectTotalBalance } from "../../redux/finance/financeSelectors";
import styles from "./Balance.module.css";

const Balance = () => {
  const totalBalance = useSelector(selectTotalBalance);

  // format: ₴ 24 000.00
  const formattedBalance = new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance || 0);

  return (
    <div className={styles.balance}>
      <p className={styles.label}>YOUR BALANCE</p>
      <p className={styles.amount}>₴ {formattedBalance}</p>
    </div>
  );
};

export default Balance;