import React, { useEffect, useState } from 'react';
import styles from '../../Components/Modal/LangaugeSelector.module.css';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ closeModal }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if(storedLanguage){
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  };


  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {/* Close button */}
        <FaTimes className={styles.closeBtn} onClick={closeModal} />
        {/* Language options */}
        <h3 className={styles.text}>{t('languageSelector.selectLanguage')}</h3>
        <div className={styles.buttons}>
          <button onClick={() => changeLanguage('en')}>{t('languageSelector.english')}</button>
          <button onClick={() => changeLanguage('ar')}>{t('languageSelector.arabic')}</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
