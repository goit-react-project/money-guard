import StatisticsDashboard from '../StatisticsDashboard/StatisticsDashboard';
import Chart from '../Chart/Chart';
import StatisticsTable from '../StatisticsTable/StatisticsTable';
import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
// Mobilde flex-direction column Tablet ve Desktopta row
  return (
    <div className={css.statisticsLayout}>
      <div className={css.left}>
        <StatisticsDashboard />
        <Chart />
      </div>
      <div className={css.right}>
        <StatisticsTable />
      </div>
    </div>
  );
};
export default StatisticsTab;
