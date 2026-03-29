import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutModal from "../LogoutModal/LogoutModal";
import Logo from "../../assets/icons/logo-icon.svg";
import ExitIcon from "../../assets/icons/logout-icon.svg";
import styles from "./Header.module.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const email = useSelector((state) => state.auth.user?.email);
  const username = email?.split("@")[0] || "User";

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          
          {/* LOGO */}
          <Link to="/dashboard/home" className={styles.logoWrap} style={{ textDecoration: 'none' }}>
            <img src={Logo} alt="Money Guard" className={styles.logo} />
            <span className={styles.logoText}>Money Guard</span>
          </Link>

          {/* USER ACTIONS */}
          <div className={styles.actions}>
            <span className={styles.username}>{username}</span>

            <div className={styles.divider}></div>

            <button
              className={styles.logoutBtn}
              onClick={() => setIsModalOpen(true)}
              aria-label="Logout"
            >
              <img src={ExitIcon} alt="logout" className={styles.exitIcon} />
              <span className={styles.exitText}>Exit</span>
            </button>
          </div>

        </div>
      </header>

      {isModalOpen && (
        <LogoutModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Header;