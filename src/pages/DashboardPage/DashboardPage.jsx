import { Outlet } from 'react-router-dom';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default DashboardPage;
