import Currency from '../Currency/Currency';
import styles from './CurrencyTab.module.css';

const CurrencyTab = () => {
  return (
    <div className={styles.wrapper}>
      <Currency />
    </div>
  );
};

export default CurrencyTab;
