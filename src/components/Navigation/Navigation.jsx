import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/icons/home-icon.svg?react";
import StatsIcon from "../../assets/icons/balance-icon.svg?react";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        <HomeIcon className={styles.icon} />
        <span className={styles.navText}>Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        <StatsIcon className={styles.icon} />
        <span className={styles.navText}>Statistics</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;