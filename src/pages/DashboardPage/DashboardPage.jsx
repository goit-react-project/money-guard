
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      {/* Header her sayfada üstte */}
      <Header />

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <Navigation />
          <Balance />
        </div>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
