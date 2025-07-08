import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import knu_logo from "./../stuff/images/knu_logo.png"
import mmf_logo from "./../stuff/images/mmf_logo.png"
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

function Header({ currentLanguage }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-blue-900 text-white py-4 w-full shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
        
        {/* Логотипи та заголовок */}
        <div className="flex items-center gap-3 md:gap-4">
          <a href="https://knu.ua/" target="_blank" rel="noopener noreferrer">
            <img src={knu_logo} alt="Логотип КНУ" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain hover:opacity-80" />
          </a>
          <a href="https://mechmat.knu.ua/" target="_blank" rel="noopener noreferrer">
            <img src={mmf_logo} alt="Логотип Мехмат" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain hover:opacity-80" />
          </a>
          <h1 className="text-sm md:text-lg font-bold leading-tight hidden sm:block">
            <Trans i18nKey="department" components={{ br: <br className="hidden md:block" /> }} />
          </h1>
        </div>
        
        {/* Гамбургер-кнопка */}
        <button
  onClick={toggleMenu}
  className="p-2 rounded-md bg-blue-900 hover:bg-blue-800 text-white transition appearance-none border-none focus:outline-none md:hidden"
>
  {menuOpen ? (
    <RxCross2 className="text-3xl" />
  ) : (
    <GiHamburgerMenu className="text-3xl" />
  )}
</button>

  

        {/* Навігація для великих екранів */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6">
          <ul className="flex gap-3 md:gap-4 text-sm md:text-base">
            {["", "news", "history", "personalities", "library", "contacts", "gallery"].map((path) => (
              <li key={path || "home"}>
                <NavLink
                  to={`/${currentLang}/${path}`}
                  end={path === ""}
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"
                  }
                >
                  {t(path || "home")}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageSwitcher currentLanguage={currentLanguage} />
        </nav>
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800 text-white px-4 py-4 space-y-4 border-t border-blue-700 shadow-md">
          <ul className="flex flex-col gap-2">
            {["", "news", "history", "personalities", "library", "contacts", "gallery"].map((path) => (
              <li key={path || "home"}>
                <NavLink
                  to={`/${currentLang}/${path}`}
                  end={path === ""}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? "font-semibold border-b border-white pb-1 block" : "hover:text-gray-300 block"
                  }
                >
                  {t(path || "home")}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <LanguageSwitcher currentLanguage={currentLanguage} />
          </div>
        </div>
      )}
    </header>
    
  );
}

export default Header;

// <header className="bg-blue-900 text-white py-4 w-full shadow-md fixed top-0 left-0 z-50">
//   <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
    
    
//     <div className="flex items-center gap-3 md:gap-4">
//       <a href="https://knu.ua/" target="_blank" rel="noopener noreferrer">
//         <img 
//           src={knu_logo} 
//           alt="Логотип КНУ" 
//           className="w-12 h-12 md:w-14 md:h-14 object-contain transition-opacity duration-300 hover:opacity-80" 
//         />
//       </a>
//       <a href="https://mechmat.knu.ua/" target="_blank" rel="noopener noreferrer">
//         <img 
//           src={mmf_logo} 
//           alt="Логотип Мехмат" 
//           className="w-12 h-12 md:w-14 md:h-14 object-contain transition-opacity duration-300 hover:opacity-80" 
//         />
//       </a>
//       <h1 className="text-lg md:text-xl font-bold leading-tight">
       
//         <Trans i18nKey="department" components={{ br: <br className="hidden md:block" /> }} />
//       </h1>
//     </div>

  
//     <nav className="flex items-center gap-4 md:gap-6">
//       <ul className="flex gap-3 md:gap-4 text-sm md:text-base">
//         <li>
//           <NavLink to={`/${currentLang}/`} end className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
//             {t("home")}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/${currentLang}/news`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
//             {t("news")}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/${currentLang}/history`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
//             {t("history")}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/${currentLang}/personalities`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
//             {t("personalities")}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/${currentLang}/library`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
//             {t("library")}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/${currentLang}/contacts`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
//             {t("contacts")}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={`/${currentLang}/gallery`} className={({ isActive }) => isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"}>
//             {t("gallery")}
//           </NavLink>
//         </li>
//       </ul>
//       <LanguageSwitcher currentLanguage={currentLanguage} />
//     </nav>
//   </div>
// </header>
