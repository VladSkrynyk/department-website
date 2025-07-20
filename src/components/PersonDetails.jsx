import React from 'react';
import { useParams } from 'react-router-dom';
//import { personalities } from '../stuff/data';
import { useSelector } from 'react-redux';
import { useGetPersonalitiesQuery, selectPersonalityById } from '../redux/personalities/personalitiesApiSlice';

import { useTranslation } from 'react-i18next';

function PersonDetails() {
  const { id } = useParams(); // Отримуємо динамічний параметр `id` з URL
  const { i18n } = useTranslation();
  //const person = personalities.find((p) => p.id.toString() === id); // Шукаємо людину за `id`

  const { isLoading } = useGetPersonalitiesQuery();
  const person = useSelector((state) => selectPersonalityById(state, id));

  if (isLoading) {
    return <div className="text-center text-blue-500 mt-10">Завантаження...</div>;
  }
  
  if (!person) {
    return <div className="text-center text-red-500 mt-10">Людину не знайдено.</div>;
  }

  return (
   <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={person.photo}
            alt={person.fullname}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto md:mx-0 md:ml-6 mt-6 md:mt-0 object-cover"
          />
          <div className="p-6 flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {i18n.language === 'uk' ? person.fullname : person.fullname_en}
            </h1>
            <p className="text-gray-600 text-lg">
              {i18n.language === 'uk' ? person.scy_degree : person.scy_degree_en}
            </p>
            <p className="text-gray-600">
              {i18n.language === 'uk' ? person.scy_rank : person.scy_rank_en}
            </p>
            <p className="text-gray-600">
              {i18n.language === 'uk' ? person.scy_position : person.scy_position_en}
            </p>
            <p className="mt-4 text-gray-700 text-justify">
              <strong>Загальна інформація:</strong> {i18n.language === 'uk' ? person.general_info : person.general_info_en}
            </p>
            <p className="mt-2 text-gray-700 text-justify">
              <strong>Наукова діяльність:</strong> {i18n.language === 'uk' ? person.scientific_activity : person.scientific_activity_en}
            </p>
            <p className="mt-2 text-gray-700 text-justify">
              <strong>Викладацька робота:</strong> {i18n.language === 'uk' ? person.teaching_work : person.teaching_work_en}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Email:</strong> {person.contact_email}
            </p>
            <p className="text-gray-700">
              <strong>Місце перебування:</strong> {person.contact_place}
            </p>
            {person.cv && (
              <p className="text-blue-600 hover:underline">
                <a href={person.cv} target="_blank" rel="noopener noreferrer">CV</a>
              </p>
            )}
            {person.links && (
              <div>
                <strong>Посилання:</strong>
                <ul className="list-disc list-inside">
                  {JSON.parse(person.links).map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
