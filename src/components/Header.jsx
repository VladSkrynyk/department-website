import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

import knu_logo from "./../stuff/images/knu_logo.png"
import mmf_logo from "./../stuff/images/mmf_logo.png"
import main_back_logo from "./../stuff/images/main_back_logo.jpg"

function Header({ currentLanguage }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <header className="bg-teal-700 text-white py-4 w-full shadow-md fixed top-0 left-0 z-50">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
    
    {/* Логотипи та заголовок */}
    <div className="flex items-center gap-3 md:gap-4">
      <a href="https://knu.ua/" target="_blank" rel="noopener noreferrer">
        <img 
          src={knu_logo} 
          alt="Логотип КНУ" 
          className="w-12 h-12 md:w-14 md:h-14 object-contain transition-opacity duration-300 hover:opacity-80" 
        />
      </a>
      <a href="https://mechmat.knu.ua/" target="_blank" rel="noopener noreferrer">
        <img 
          src={mmf_logo} 
          alt="Логотип Мехмат" 
          className="w-12 h-12 md:w-14 md:h-14 object-contain transition-opacity duration-300 hover:opacity-80" 
        />
      </a>
      <h1 className="text-lg md:text-xl font-bold leading-tight">
        Кафедра диференціальних <br className="hidden md:block" /> та інтегральних рівнянь
      </h1>
    </div>

    {/* Навігація */}
    <nav className="flex items-center gap-4 md:gap-6">
      <ul className="flex gap-3 md:gap-4 text-sm md:text-base">
        <li>
          <NavLink to={`/${currentLang}/`} end className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
            {t("home")}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${currentLang}/news`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
            {t("news")}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${currentLang}/history`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
            {t("history")}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${currentLang}/personalities`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
            {t("personalities")}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${currentLang}/library`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
            {t("library")}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${currentLang}/contacts`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
            {t("contacts")}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${currentLang}/gallery`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
            {t("gallery")}
          </NavLink>
        </li>
      </ul>
      <LanguageSwitcher currentLanguage={currentLanguage} />
    </nav>
  </div>
</header>








  );
}

export default Header;
