import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className={styles.dashboard}>
      <Header />

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <Navigation />
          
          <button 
            className={styles.balanceToggle} 
            onClick={() => setShowBalance(prev => !prev)}
          >
            {showBalance ? "Hide Balance" : "Show Balance"}
          </button>

          {showBalance && <Balance />}
        </div>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
