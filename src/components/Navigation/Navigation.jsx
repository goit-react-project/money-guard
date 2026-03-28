import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/home" className={styles.link}>
        Home
      </NavLink>
      <NavLink to="/statistics" className={styles.link}>
        Statistics
      </NavLink>
      <NavLink to="/currency" className={styles.link}>
        Currency
      </NavLink>
    </nav>
  );
};

export default Navigation;