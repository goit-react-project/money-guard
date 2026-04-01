import { Outlet, useMatch } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const isHome = useMatch("/dashboard/home");

  return (
    <div className={styles.dashboard}>
      <Header />

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <Navigation />
          <div className={isHome ? styles.balanceVisible : styles.balanceHidden}>
            <Balance />
          </div>
        </div>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
