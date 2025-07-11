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
      gallery: "Gallery",
      switchLanguage: "Switch Language",
      department: "Integral and Differential<br className='hidden md:block'/> Equations Department"
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
      gallery: "Галерея",
      switchLanguage: "Змінити мову",
      department: "Кафедра диференціальних <br className='hidden md:block'/> та інтегральних рівнянь",
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
