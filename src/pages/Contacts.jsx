import React from 'react';

function Contacts() {
  return <>
   <div id="contacts-section" className="container mx-auto px-4 py-20 ">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 ">Контакти</h2>

  {/* Контактна інформація у два стовпці */}
  <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto">
    <div className="grid grid-cols-2 gap-x-12">
      <div className="text-lg text-gray-700 font-semibold space-y-2 text-left">
        <p>Адреса для листування:</p>
        <p>Місцезнаходження:</p>
        <p>Телефон:</p>
        <p>E-mail:</p>
      </div>
      <div className="text-lg text-gray-700 space-y-2 text-left">
        <p>01601 м. Київ, вул. Володимирська, 64.</p>
        <p>м. Київ, просп. акад. Глушкова, 4Е.</p>
        <p>+380 44 259-05-90</p>
        <p>knu.diffeq@gmail.com</p>
      </div>
    </div>
  </div>

  {/* Карта */}
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
  </>;
}

export default Contacts;
