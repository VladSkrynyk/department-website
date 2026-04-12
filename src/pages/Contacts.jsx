import React from 'react';
import { useTranslation } from 'react-i18next';

function Contacts() {
  const { t, i18n } = useTranslation();

  return (
    <div id="contacts-section" className="container mx-auto px-4 py-20">
      <div className="text-center mb-6 pt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t("contacts")}</h2>
        <div className="mt-2 border-b-2 border-gray-300 w-3/4 mx-auto md:w-2/3 lg:w-1/2"></div>
      </div>

      {/* Контактна інформація */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-12">
          {/* Мітки */}
          <div className="text-lg text-gray-700 font-semibold space-y-2 text-left hidden md:block">
            <p>{t("addressLabel")}</p>
            <p>{t("locationLabel")}</p>
            <p>{t("phoneLabel")}</p>
            <p>{t("emailLabel")}</p>
          </div>

          {/* Значення (на мобільних будуть під мітками, на десктопі — колонкою) */}
          <div className="text-lg text-gray-700 space-y-2 text-left">
            <div className="md:hidden font-semibold mt-2">{t("addressLabel")}</div>
            <p>{t("addressValue")}</p>
            
            <div className="md:hidden font-semibold mt-2">{t("locationLabel")}</div>
            <p>{t("locationValue")}</p>
            
            <div className="md:hidden font-semibold mt-2">{t("phoneLabel")}</div>
            <p>+380 44 259-05-90</p>
            
            <div className="md:hidden font-semibold mt-2">{t("emailLabel")}</div>
            <p>knu.diffeq@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Карта (Мехмат КНУ) */}
      <div className="flex justify-center">
        <div className="shadow-xl rounded-lg overflow-hidden w-full max-w-4xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1272.0368405080537!2d30.469222939031916!3d50.38382500318352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c8e6a75067e9%3A0x66297579244a37f!2z0JzQtdGF0LDQvdGW0LrQvi3QvNCw0YLQtdC80LDRgtC40YfQvdC40Lkg0YTQsNC60YPQu9GM0YLQtdGCINCa0J3QoyDRltC80LXQvdGWINCi0LDRgNCw0YHQsCDQqNC10LLRh9C10L3QutCw!5e0!3m2!1suk!2sua!4v1738157718996!5m2!1suk!2sua"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
