import StatisticsDashboard from '../StatisticsDashboard/StatisticsDashboard';
import Chart from '../Chart/Chart';
import StatisticsTable from '../StatisticsTable/StatisticsTable';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';
import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftSide}>
        <div className={styles.navWrap}>
          <Navigation />
        </div>
        <div className={styles.balanceWrap}>
          <Balance />
        </div>
        <div className={styles.currencyWrap}>
          <Currency />
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.rightTop}>
          <Currency />
        </div>
      </div>

      <div className={styles.statisticsSection}>
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
    </div>
  );
};
export default StatisticsTab;
