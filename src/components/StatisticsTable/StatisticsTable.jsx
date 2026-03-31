import { useSelector } from 'react-redux';
import {
  selectStatistics,
  selectIsLoading,
  selectError,
} from '../../redux/finance/financeSelectors';
import { color } from '../../utils/categoryColors';
import Loader from '../Loader/Loader';
import styles from './StatisticsTable.module.css';

const StatisticsTable = () => {
  const stats = useSelector(selectStatistics);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) return <Loader />;
  if (error) return <div>Data could not be received.</div>;

  // Sadece EXPENSE kategorileri
  const expenses =
    stats?.categoriesSummary?.filter((c) => c.type === 'EXPENSE') ?? [];

  // Veri yoksa placeholder
  if (!stats || expenses.length === 0) {
    return (
      <div className={styles.placeholder}>No transactions for this period.</div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      <ul className={styles.list}>
        {expenses.map((cat) => (
          <li key={cat.name} className={styles.item}>
            {/* Charttaki renkle eşleşir */}
            <span
              className={styles.dot}
              style={{ backgroundColor: color(cat.name) }}
            />
            <span className={styles.name}>{cat.name}</span>
            <span className={styles.amount}>
              {Math.abs(cat.total).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Expenses:</span>
          <span className={styles.expense}>
            {Math.abs(stats.expenseSummary ?? 0).toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span>Income:</span>
          <span className={styles.income}>
            {(stats.incomeSummary ?? 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
