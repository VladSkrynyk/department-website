import React from 'react';
import { useParams } from 'react-router-dom';
//import { personalities } from '../stuff/data';
import { useSelector } from 'react-redux';
import { useGetPersonalitiesQuery, selectPersonalityById } from '../redux/personalities/personalitiesApiSlice';
import { Link } from "react-router-dom";
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
  <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    
    {/* Кнопка назад */}
    <div className="p-4">
      <Link
        to="/uk/personalities" // або /en/personalities залежно від локалізації
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {i18n.language === "uk" ? "До списку персоналій" : "Back to Personalities"}
      </Link>
    </div>

    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 p-6">
      {/* Фото */}
      <img
        src={person.photo}
        alt={person.fullname}
        className="w-40 h-40 lg:w-52 lg:h-52 rounded-full object-cover shadow-md"
      />

      {/* Текстовий блок */}
      <div className="flex-1 max-w-3xl space-y-3 text-gray-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {i18n.language === 'uk' ? person.fullname : person.fullname_en}
        </h1>
        <p className="text-lg font-medium text-gray-600">
          {i18n.language === 'uk' ? person.scy_degree : person.scy_degree_en}
        </p>
        <p>{i18n.language === 'uk' ? person.scy_rank : person.scy_rank_en}</p>
        <p>{i18n.language === 'uk' ? person.scy_position : person.scy_position_en}</p>

        {/* Абзаци */}
        <p>
          <strong>Загальна інформація:</strong>{" "}
          {i18n.language === 'uk' ? person.general_info : person.general_info_en}
        </p>
        <p>
          <strong>Наукова діяльність:</strong>{" "}
          {i18n.language === 'uk' ? person.scientific_activity : person.scientific_activity_en}
        </p>
        <p>
          <strong>Викладацька робота:</strong>{" "}
          {i18n.language === 'uk' ? person.teaching_work : person.teaching_work_en}
        </p>

        {/* Контакти */}
        <p><strong>Email:</strong> {person.contact_email}</p>
        <p><strong>Місце перебування:</strong> {person.contact_place}</p>

        {/* CV */}
        {person.cv && (
          <p>
            <a
              href={person.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              CV
            </a>
          </p>
        )}

        {/* Посилання */}
        {person.links && (
          <div>
            <strong>Посилання:</strong>
            <ul className="list-disc list-inside space-y-1">
              {JSON.parse(person.links).map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
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
