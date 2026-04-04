import StatisticsDashboard from '../StatisticsDashboard/StatisticsDashboard';
import Chart from '../Chart/Chart';
import StatisticsTable from '../StatisticsTable/StatisticsTable';
import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.statisticsLayout}>
        <div className={styles.left}>
          <Chart />
        </div>
        <div className={styles.right}>
          <StatisticsDashboard />
          <StatisticsTable />
        </div>
      </div>
    </div>
  );
};
export default StatisticsTab;
