import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../redux/finance/financeOperations';
import CurrencyChart from '../Chart/Chart';
import styles from "./CurrencyTab.module.css";


const CurrencyTab = () => {
  const dispatch = useDispatch();

  const rates = useSelector(state => state.finance.currency);
  const isLoading = useSelector(state => state.finance.isLoading);
  const error = useSelector(state => state.finance.error);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <span>Currency</span>
        <span>Purchase</span>
        <span>Sale</span>
      </div>

      {isLoading && <p className={styles.message}>Loading...</p>}

      {error && <p className={styles.message}>Failed to load currency</p>}

      {!isLoading && !error && (
        <ul className={styles.list}>
          {rates.map(({ currency, purchase, sale }) => (
            <li key={currency} className={styles.row}>
              <span>{currency}</span>
              <span>{purchase.toFixed(2)}</span>
              <span>{sale.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.chart}>
        <CurrencyChart />
      </div>
    </section>
  );
};

export default CurrencyTab;