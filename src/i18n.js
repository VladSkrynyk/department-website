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
      footerRights: "All rights reserved.",

      addressLabel: "Mailing address:",
      locationLabel: "Location:",
      phoneLabel: "Phone:",
      emailLabel: "E-mail:",
      addressValue: "01601 Kyiv, Volodymyrska str., 64.",
      locationValue: "Kyiv, Acad. Glushkov ave., 4E.",
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
      footerRights: "Всі права захищені.",

      addressLabel: "Адреса для листування:",
      locationLabel: "Місцезнаходження:",
      phoneLabel: "Телефон:",
      emailLabel: "E-mail:",
      addressValue: "01601 м. Київ, вул. Володимирська, 64.",
      locationValue: "м. Київ, просп. акад. Глушкова, 4Е.",
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
