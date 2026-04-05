import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      home: "Home",
      news: "News",
      history: "History",
      personalities: "Personalities",
      library: "Library",
      contacts: "Contacts",
      student: "For Student",

      switchLanguage: "Switch Language",
      department: "Integral and Differential<br className='hidden md:block'/> Equations Department",

      // Footer translations
      usefulLinks: "Useful Links",
      deptNameFull: "Integral and Differential Equations Department",
      mechmatFull: "Faculty of Mechanics and Mathematics, KNU",
      kievUniFull: "Taras Shevchenko National University of Kyiv",
      footerContacts: "Contacts",
      footerRights: "All rights reserved."
    },
  },
  uk: {
    translation: {
      home: "Головна",
      news: "Новини",
      history: "Історія",
      personalities: "Персоналії",
      library: "Бібліотека",
      contacts: "Контакти",
      student: "Студенту",
      
      switchLanguage: "Змінити мову",
      department: "Кафедра інтегральних <br className='hidden md:block'/> та диференціальних рівнянь",

      // Переклади для футера
      usefulLinks: "Корисні посилання",
      deptNameFull: "Кафедра інтегральних та диференціальних рівнянь",
      mechmatFull: "Механіко-математичний факультет КНУ",
      kievUniFull: "Київський національний університет ім. Тараса Шевченка",
      footerContacts: "Контакти",
      footerRights: "Всі права захищені."
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: 'uk',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
