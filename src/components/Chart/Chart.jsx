import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import {
  selectStatistics,
  selectIsLoading,
  selectError,
} from '../../redux/finance/financeSelectors';
import { color } from '../../utils/categoryColors';
import Loader from '../Loader/Loader';
import styles from './Chart.module.css';

// register olmadan render olmaz
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Chart = () => {
  // Redux'tan istatistik okur StatisticsDashboard dispatch edince otomatik güncel
  const stats = useSelector(selectStatistics);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) return <Loader />;
  if (error) return <div>Failed to Receive Data.</div>;

  // Sadece EXPENSE kategorileri grafikte gösterilir
  const expenses =
    stats?.categoriesSummary?.filter((c) => c.type === 'EXPENSE') ?? [];

  const hasData = expenses.length > 0;

  // Veri varsa gerçek data yoksa gri daire
  const chartData = hasData
    ? {
        labels: expenses.map((c) => c.name),
        datasets: [
          {
            data: expenses.map((c) => Math.abs(c.total)),
            backgroundColor: expenses.map((c) => color(c.name)),
            borderWidth: 0,
          },
        ],
      }
    : {
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['grey'],
            borderWidth: 0,
          },
        ],
      };

  const total = hasData
    ? expenses.reduce((sum, c) => sum + Math.abs(c.total), 0).toFixed(2)
    : '0.00';

  return (
    <div className={styles.box}>
      {/* Statistics başlığı */}
      <p className={styles.title}>Statistics</p>
      <div className={styles.chartWrapper}>
        <p className={styles.centerText}>$ {total}</p>
        <Doughnut
          className={styles.doughnut}
          data={chartData}
          options={{
            cutout: '70%',
            plugins: {
              legend: { display: false },
              tooltip: { enabled: hasData },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
