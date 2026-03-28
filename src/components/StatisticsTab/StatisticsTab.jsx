import StatisticsDashboard from '../StatisticsDashboard/StatisticsDashboard';
import Chart from '../Chart/Chart';
import StatisticsTable from '../StatisticsTable/StatisticsTable';
import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
  // Mobilde flex-direction column Tablet ve Desktopta row
  return (
    <div className={styles.statisticsLayout}>
      <div className={styles.left}>
        <StatisticsDashboard />
        <Chart />
      </div>
      <div className={styles.right}>
        <StatisticsTable />
      </div>
    </div>
  );
};
export default StatisticsTab;
