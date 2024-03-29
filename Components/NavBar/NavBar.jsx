import React, { useState, useContext, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Style from './NavBar.module.css';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model, Error, ProfileModel } from '../index';
import images from '../../assets';
import LanguageSelector from '../Modal/LanguageSelector';
import ThemeSelector from "../Modal/ThemeSelector";
import { useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';
import { useRouter } from 'next/router'; // Import useRouter hook

const NavBar = () => {

  const { t, i18n } = useTranslation();
  const { account, userName, userImage, connectWallet, createAccount, error, updateUsername, updateUserProfileImage } = useContext(ChatAppContext);
 
  //const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [themeModal, setThemeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const menuItems = [
    { menu: t('navbar.allUsers'), link: '/alluser' },
    { menu: t('navbar.chat'), link: '/' },
    { menu: t('navbar.contact'), link: '/contact' },
    { menu: t('navbar.settings'), link: '/' },
    { menu: t('navbar.faqs'), link: '/faq' },
    { menu: t('navbar.termsOfUse'), link: '/terms' }
  ];

  const router = useRouter(); // Initialize useRouter hook
  // Determine active link based on the current URL
  const getActiveIndex = () => {
    const currentPath = router.pathname;
    const index = menuItems.findIndex(item => item.link === currentPath);
    return index >= 0 ? index + 1 : 1; // If not found, default to 1st index
  };
  const [active, setActive] = useState(getActiveIndex()); // Set initial active state based on URL

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      applyTheme(storedTheme);
    } else {
      applyTheme('dark');
    }
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const applyTheme = (theme) => {
    document.querySelector("body").setAttribute("data-theme", theme);
  };

  const handleSettingsClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageClick = () => {
    setShowModal(true);
  };

  const handleThemeClick = () => {
    setThemeModal(true);
  };

  const handleThemeChange = (theme) => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  };

  const handleMenuItemClick = (index) => {
    setActive(index);
  };

  const handleModels = () => {
    if(userName == "") {
      setOpenModel(true)
    }
    else {
      setShowProfileModal(true);
    }
  }

  //console.log('userImage: ', userImage);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={75} height={60}/>
        </div>
        <div className={Style.NavBar_box_right}>
          {/* DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div key={i + 1} className={`${Style.NavBar_box_right_menu_items} ${active === i + 1 ? Style.active_btn : ""}`} 
              onClick={() => handleMenuItemClick(i + 1)}>
                {el.menu === t('navbar.settings') ? (
                  <div className={Style.dropdown}>
                    <button className={Style.dropbtn} onClick={handleSettingsClick}>
                      {t('navbar.settings')} <FaAngleDown   />
                    </button>
                    {showDropdown && (
                      <ul className={`${Style.dropdownMenu} ${showDropdown ? Style.show : ""}`}>
                        <li className={Style.menuItem}>
                          <a className={Style.link} onClick={handleLanguageClick}>{t('navbar.language')}</a>
                        </li>
                        <li className={Style.menuItem}>
                          <a className={Style.link} onClick={handleThemeClick}>{t('navbar.theme')}</a>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>{el.menu}</Link>
                )}
              </div>
            ))}
            {showModal && (
              <LanguageSelector
                closeModal={() => {
                  setShowModal(false);
                }}
              />
            )}
            {themeModal && (
              <ThemeSelector
                closeModal={() => {
                  setThemeModal(false);
                }}
                onThemeChange={handleThemeChange}
              />
            )}
          </div>
          {/* MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
              <div key={i + 1} className={`${Style.NavBar_box_right_menu_items} ${active === i + 1 ? Style.active_btn : ""}`}
              onClick={() => handleMenuItemClick(i + 1)}>
                {el.menu === t('navbar.settings') ? (
                  <div className={Style.dropdown}>
                    <button className={Style.dropbtn} onClick={handleSettingsClick}>
                      {t('navbar.settings')} <FaAngleDown   />
                    </button>
                    {showDropdown && (
                      <ul className={`${Style.dropdownMenu} ${showDropdown ? Style.show : ""}`}>
                        <li className={Style.menuItem}>
                          <a className={Style.link} onClick={handleLanguageClick}>{t('navbar.language')}</a>
                        </li>
                        <li className={Style.menuItem}>
                          <a className={Style.link} onClick={handleThemeClick}>{t('navbar.theme')}</a>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>{el.menu}</Link>
                )}
              </div>
            ))}
             {showModal && (
              <LanguageSelector
                closeModal={() => {
                  setShowModal(false);
                }}
              />
            )}
            {themeModal && (
              <ThemeSelector
                closeModal={() => {
                  setThemeModal(false);
                }}
                onThemeChange={handleThemeChange}
              />
            )}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}
          {/* CONNECT WALLET */}
          <div className={Style.NavBar_box_right_connect}>
            {account === "" ? (
              <button onClick={() => connectWallet()}>
                <span>{t('connectWallet.connectWallet')}</span>
              </button>
            ) : (
              <button onClick={handleModels}>
                <Image src={userName ? userImage ? `https://magenta-obliged-rodent-373.mypinata.cloud/ipfs/${userImage}?pinataGatewayToken=TBXq_-pyK84EaMuFE5zEUB-DcgITbYLhjgxuxpt9qgJCVYmk9tY0SgCS1_DhuDmd` : images.accountName : images.create2} alt="Account Image" width={20} height={20} style={{borderRadius: "50%"}}/>
                <small>{userName || t('connectWallet.createAccount')}</small>
              </button>
            )}
          </div>
          <div className={Style.NavBar_box_right_open} onClick={() => setOpen(true)}>
            <Image src={images.open} alt="open" width={30} height={30}/>
          </div>
        </div>
      </div>
      {/* MODEL COMPONENT */}
      {openModel && userName === "" && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title={t('model.welcomeTo')}
            head='Chat Circuit'
            info={t('model.info')}
            smallInfo={t('model.kindlySelect')}
            image={images.accountBg}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}

      {showProfileModal && userName !== "" && (
        <div className={Style.modelProfileBox}>
          <ProfileModel 
            closeModal={() => {
                setShowProfileModal(false);
            }}
            username ={userName}
            userImage = {userImage}
            functionUserName={updateUsername}
            functionUserProfile={updateUserProfileImage}
          />
        </div>
      )}

      {/* ERROR COMPONENT */}
      {error !== "" && <Error error={error} />}
    </div>
  )
};

export default NavBar;

