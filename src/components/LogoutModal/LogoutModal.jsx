import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../redux/auth/authSlice';
import { logoutUser } from '../../redux/auth/authOperations';
import styles from './LogoutModal.module.css';
import LogoIcon from '../../assets/icons/logo-icon.svg?react';
import { toast } from 'react-toastify';

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.rejected.match(resultAction)) {
        toast.error('Logout error occurred!');
      }
    } catch {
      toast.error('An error occurred while connecting to the server!');
    } finally {
      dispatch(clearAuth());
      localStorage.removeItem('persist:root');
      navigate('/login');
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.logoContainer}>
          <LogoIcon className={styles.logo} />
          <p className={styles.logoText}>Money Guard</p>
        </div>
        <p className={styles.modalText}>Are you sure you want to log out?</p>
        <div className={styles.actions}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
