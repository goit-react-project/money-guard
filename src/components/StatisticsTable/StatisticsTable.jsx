import { useSelector } from 'react-redux';
import { selectStatistics } from '../../redux/finance/financeSlice';
import { color } from '../Chart/Chart';
import styles from './StatisticsTable.module.css';

const StatisticsTable = () => {
  const stats = useSelector(selectStatistics);

  // Sadece EXPENSE kategorileri
  const expenses = stats?.categoriesSummary?.filter(
    c => c.type === 'EXPENSE'
  ) ?? [];

  // Veri yoksa placeholder
  if (!stats || expenses.length === 0) {
    return (
      <div className={css.placeholder}>
        No transactions for this period.
      </div>
    );
  }

  return (
    <div className={css.wrapper}>

      <div className={css.header}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      <ul className={css.list}>
        {expenses.map((cat) => (
          <li key={cat.name} className={css.item}>
            {/* Charttaki renkle eşleşir */}
            <span
              className={css.dot}
              style={{ backgroundColor: color(cat.name) }}
            />
            <span className={css.name}>{cat.name}</span>
            <span className={css.amount}>
              {Math.abs(cat.total).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className={css.summary}>
        <div className={css.summaryRow}>
          <span>Expenses:</span>
          <span className={css.expense}>
            {Math.abs(stats.expenseSummary ?? 0).toFixed(2)}
          </span>
        </div>
        <div className={css.summaryRow}>
          <span>Income:</span>
          <span className={css.income}>
            {(stats.incomeSummary ?? 0).toFixed(2)}
          </span>
        </div>
      </div>

    </div>
  );
};

export default StatisticsTable;
