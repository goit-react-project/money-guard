import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authOperations";
import styles from "./LogoutModal.module.css";
import { toast } from "react-toastify";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.rejected.match(resultAction)) {
        toast.error("Logout hatası oluştu!");
      }
    } catch (error) {
      toast.error("Sunucuya bağlanırken hata oluştu!");
      console.error("Logout error:", error);
    } finally {
      dispatch(clearAuth());
      localStorage.clear();
      navigate("/login");
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} 
      >
        <p className={styles.modalText}>
          Gerçekten çıkmak istiyor musun?
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;