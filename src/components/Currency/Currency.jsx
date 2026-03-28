import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../redux/finance/financeOperations';
import { selectCurrency } from '../../redux/finance/financeSlice';
import styles from './Currency.module.css';

const Currency = () => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  // 1 saat dolmadı local, doldu api
  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currencyTable}>
        <div className={styles.currencyHeader}>
          <div>Currency</div>
          <div>Purchase</div>
          <div>Sale</div>
        </div>

        {currency.length === 0 ? (
          <div className={styles.currencyRow}>
            <div>-</div>
            <div>-</div>
            <div>-</div>
          </div>
        ) : (
          currency.map((item) => (
            <div className={styles.currencyRow} key={item.currencyCodeA}>
              <div>{item.currencyCodeA === 840 ? 'USD' : 'EUR'}</div>
              <div>{item.rateBuy?.toFixed(2) ?? '-'}</div>
              <div>{item.rateSell?.toFixed(2) ?? '-'}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Currency;
