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
import { selectStatistics } from '../../redux/finance/financeSelectors';
import styles from './Chart.module.css';

// register olmadan render olmaz
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

// Kategori adına göre renk döndürür StatisticsTable.jsx import eder renkler eşleşir.
export function color(category) {
  switch (category) {
    case 'Main expenses':
      return '#FED057';
    case 'Products':
      return '#FFD8D0';
    case 'Car':
      return '#FD9498';
    case 'Self care':
      return '#C5BAFF';
    case 'Child care':
      return '#6E78E8';
    case 'Household products':
      return '#4A56E2';
    case 'Education':
      return '#81E1FF';
    case 'Leisure':
      return '#24CCA7';
    case 'Other expenses':
      return '#00AD84';
    case 'Entertainment':
      return '#e20a5dff';
    default:
      return '#888888';
  }
}

const Chart = () => {
  // Redux'tan istatistik okur StatisticsDashboard dispatch edince otomatik güncel
  const stats = useSelector(selectStatistics);

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
  : "0.00";

  return (
    <div className={styles.box}>
      {/* Statistics başlığı */}
      <p className={styles.title}>Statistics</p>
      {/* Grafik ortasına toplam */}
      <p className={styles.centerText}>$ {total}</p>

      <Doughnut
        data={chartData}
        options={{
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: hasData }, // veri yoksa tooltip çalışmaz
          },
        }}
      />
      <div className={styles.chartWrapper}>
        <p className={styles.centerText}>$ {total}</p>
        <Doughnut
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
