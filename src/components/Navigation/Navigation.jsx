import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/icons/home-icon.svg?react";
import StatsIcon from "../../assets/icons/balance-icon.svg?react";
import CurrencyIcon from "../../assets/icons/currency-icon.svg?react";
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
        <span className={styles.iconWrap}>
          <HomeIcon className={styles.icon} />
        </span>
        <span className={styles.navText}>Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        <span className={styles.iconWrap}>
          <StatsIcon className={styles.icon} />
        </span>
        <span className={styles.navText}>Statistics</span>
      </NavLink>

      <NavLink
        to="/dashboard/currency"
        className={({ isActive }) =>
          `${isActive ? styles.activeLink : styles.link} ${styles.mobileCurrencyLink}`
        }
      >
        <span className={styles.iconWrap}>
          <CurrencyIcon className={styles.icon} />
        </span>
        <span className={styles.mobileOnly}>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;