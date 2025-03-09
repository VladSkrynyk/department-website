import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa"; // Іконка глобуса
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom"; // Для доступу до поточного шляху
import ukFlag from "../stuff/images/ukr_flag.png"; // Шлях до українського прапора
import enFlag from "../stuff/images/eng_flag.png"; // Шлях до англійського прапора

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Отримуємо поточний шлях
  const navigate = useNavigate(); // Для перенаправлення

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Зміна мови
    setIsDropdownOpen(false); // Закриваємо меню після вибору мови

    // Якщо поточний шлях починається з /en або /uk, замінюємо його на нову мову
    const pathSegments = location.pathname.split('/');
    pathSegments[1] = language; // Заміна сегмента шляху на нову мову
    const newPath = pathSegments.join('/'); // Формуємо новий шлях

    navigate(newPath); // Перенаправляємо користувача на нову сторінку з відповідною мовою
  };

  return (
    <div className="relative inline-block text-left">
      {/* Кнопка перемикання мови */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
      >
        <FaGlobe size={20} />
      </button>

      {/* Випадаюче меню */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-16 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            <li
              onClick={() => handleLanguageChange("uk")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img src={ukFlag} alt="Українська" className="w-7 h-5" />
            </li>
            <li
              onClick={() => handleLanguageChange("en")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img src={enFlag} alt="English" className="w-7 h-5" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
