import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Currency from '../Currency/Currency';
import styles from './CurrencyTab.module.css';

const TABLET_BREAKPOINT = 768;

const CurrencyTab = () => {
  const navigate = useNavigate();

  // Tablet veya daha büyük ekranda home
  useEffect(() => {
    if (window.innerWidth >= TABLET_BREAKPOINT) {
      navigate('/dashboard/home', { replace: true });
    }
  }, [navigate]);

  return <Currency />;
};

export default CurrencyTab;
