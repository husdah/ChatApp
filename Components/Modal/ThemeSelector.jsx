import React, { useState, useEffect} from 'react';
import styles from '../../Components/Modal/LangaugeSelector.module.css';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ThemeSelector = ({ closeModal }) => { 
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'; 
  });

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme]);

  const handleLightClick = () => {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };

  const handleDarkClick = () => {
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {/* Close button */}
        <FaTimes className={styles.closeBtn} onClick={closeModal} /> 
        {/* Theme options */}
        <h3 className={styles.text}>{t('themeSelector.selectTheme')}</h3>
        <div className={styles.buttons}>
          <button onClick={handleDarkClick}>{t('themeSelector.dark')}</button>
          <button onClick={handleLightClick}>{t('themeSelector.light')}</button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
