import React, { useEffect } from 'react';
import styles from '../styles/terms.module.css';
import { useTranslation } from 'react-i18next';
import { FaUserCircle, FaLink, FaExchangeAlt, FaQuestionCircle, FaLock } from 'react-icons/fa';

const TermsOfUse = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{t('terms.heading')}</h1>
      <div className={styles.termsContainer}>
        <div className={styles.card}>
          <div className={styles.front}>
            <FaUserCircle className={styles.icon} />
            <h2 className={styles.title}>{t('terms.accounts.title')}</h2>
          </div>
          <div className={styles.back}>
            <p className={styles.description}>{t('terms.accounts.description')}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.front}>
            <FaLink className={styles.icon} />
            <h2 className={styles.title}>{t('terms.links.title')}</h2>
          </div>
          <div className={styles.back}>
            <p className={styles.description}>{t('terms.links.description')}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.front}>
            <FaExchangeAlt className={styles.icon} />
            <h2 className={styles.title}>{t('terms.changes.title')}</h2>
          </div>
          <div className={styles.back}>
            <p className={styles.description}>{t('terms.changes.description')}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.front}>
            <FaQuestionCircle className={styles.icon} />
            <h2 className={styles.title}>{t('terms.contact.title')}</h2>
          </div>
          <div className={styles.back}>
            <p className={styles.description}>{t('terms.contact.description')}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.front}>
            <FaLock className={styles.icon} />
            <h2 className={styles.title}>{t('terms.security.title')}</h2>
          </div>
          <div className={styles.back}>
            <p className={styles.description}>{t('terms.security.description')}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.front}>
            <FaQuestionCircle className={styles.icon} />
            <h2 className={styles.title}>{t('terms.disclaimer.title')}</h2>
          </div>
          <div className={styles.back}>
            <p className={styles.description}>{t('terms.disclaimer.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
