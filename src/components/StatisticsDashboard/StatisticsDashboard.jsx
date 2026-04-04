import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStatistics } from '../../redux/finance/financeOperations';
import styles from './StatisticsDashboard.module.css';

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

// Son 5 yıl ve içinde bulunduğumuz yıl olarak 6 yıl
const getYears = () => {
  const current = new Date().getFullYear();
  return Array.from({ length: 6 }, (_, i) => current - i);
};

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={month}
        onChange={handleMonthChange}
      >
        {MONTHS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={year}
        onChange={handleYearChange}
      >
        {getYears().map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatisticsDashboard;
