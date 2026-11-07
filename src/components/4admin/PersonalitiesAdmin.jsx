import React, { useState } from 'react';
import { useGetPersonalitiesQuery, useDeletePersonalityMutation } from "../../redux/personalities/personalitiesApiSlice";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditingPersonality } from '../../redux/personalities/personalitySlice';

import { Link } from "react-router-dom";

function PersonalitiesAdmin() {
  const { data: personalitiesRaw, isLoading, isError } = useGetPersonalitiesQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletePersonality] = useDeletePersonalityMutation();
  const [selectedPersonality, setSelectedPersonality] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLang, setModalLang] = useState('uk'); // 'uk' або 'en'

  const openModal = (person) => {
    setSelectedPersonality(person);
    setModalLang('uk'); // за замовчуванням відкриваємо українську версію
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPersonality(null);
    setIsModalOpen(false);
  };

  const personalities = personalitiesRaw?.ids?.map(id => personalitiesRaw.entities[id]) || [];

  const handleEdit = (person) => {
    dispatch(setEditingPersonality(person));
    navigate('/admin/edit-personality');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ти впевнений, що хочеш видалити цю персоналію?")) {
      try {
        await deletePersonality(id).unwrap();
        console.log(`Персона з id ${id} успішно видалена.`);
      } catch (error) {
        console.error("Помилка при видаленні:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Адміністративна панель – Персоналії
        </h1>
        <Link to="/admin/add-personality">
          <button
            className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-2xl rounded"
            title="Додати персоналію"
          >
            +
          </button>
        </Link>
      </div>

      {isLoading && <p className="text-center text-gray-700">Завантаження...</p>}
      {isError && <p className="text-center text-red-600">Помилка завантаження даних</p>}

      <div className="bg-gray-200 rounded-lg p-6 max-h-[calc(100vh-160px)] overflow-y-auto">
        {personalities.map((person) => (
          <div
            key={person?._id || person?.id}
            className="flex items-center justify-between bg-gray-300 text-gray-900 rounded-lg p-4 mb-4"
          >
            <div>
              <p className="text-lg font-semibold">{person?.fullname || "Без імені"}</p>
              {person?.fullname_en && (
                <p className="text-sm text-gray-600 italic">{person.fullname_en}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => openModal(person)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                title="Переглянути"
              >
                <FaEye className="text-xl" />
              </button>
              <button
                onClick={() => handleEdit(person)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                title="Редагувати"
              >
                <FaEdit className="text-xl" />
              </button>
              <button
                onClick={() => handleDelete(person._id || person.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                title="Видалити"
              >
                <FaTrashAlt className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальне вікно перегляду */}
      {isModalOpen && selectedPersonality && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl flex flex-col max-h-[90vh] shadow-2xl relative">
            
            {/* Кнопка-хрестик */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Шапка з перемикачем мов */}
            <div className="p-6 border-b border-gray-100 flex flex-col items-center gap-3">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                {modalLang === 'uk'
                  ? (selectedPersonality.fullname || "Без імені")
                  : (selectedPersonality.fullname_en || selectedPersonality.fullname || "No Name")}
              </h2>

              {/* Таби перемикання мови перегляду */}
              <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button
                  onClick={() => setModalLang('uk')}
                  className={`px-4 py-1 text-xs font-semibold rounded-md transition ${
                    modalLang === 'uk'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  UA (Українська)
                </button>
                <button
                  onClick={() => setModalLang('en')}
                  className={`px-4 py-1 text-xs font-semibold rounded-md transition ${
                    modalLang === 'en'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN (English)
                </button>
              </div>
            </div>

            {/* Тіло модалки */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
              
              {selectedPersonality.photo && (
                <div className="flex justify-center mb-6">
                  <img
                    src={selectedPersonality.photo}
                    alt={selectedPersonality.fullname}
                    className="w-44 h-44 object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              )}

              <div className="space-y-6 text-gray-700">
                {/* Основні дані відповідно до обраної мови */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>{modalLang === 'uk' ? 'Науковий ступінь:' : 'Degree:'}</strong>{' '}
                    {(modalLang === 'uk' ? selectedPersonality.scy_degree : selectedPersonality.scy_degree_en) || "—"}
                  </p>
                  <p>
                    <strong>{modalLang === 'uk' ? 'Наукове звання:' : 'Academic Rank:'}</strong>{' '}
                    {(modalLang === 'uk' ? selectedPersonality.scy_rank : selectedPersonality.scy_rank_en) || "—"}
                  </p>
                  <p>
                    <strong>{modalLang === 'uk' ? 'Посада:' : 'Position:'}</strong>{' '}
                    {(modalLang === 'uk' ? selectedPersonality.scy_position : selectedPersonality.scy_position_en) || "—"}
                  </p>
                  <p>
                    <strong>Email:</strong> <span className="text-blue-600">{selectedPersonality.contact_email || "—"}</span>
                  </p>
                </div>

                <p>
                  <strong>{modalLang === 'uk' ? 'Місце перебування:' : 'Location:'}</strong>{' '}
                  {selectedPersonality.contact_place || "—"}
                </p>
                
                {selectedPersonality.cv && (
                  <p>
                    <strong>CV:</strong>{' '}
                    <a
                      href={selectedPersonality.cv}
                      className="text-blue-500 hover:underline inline-flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {modalLang === 'uk' ? 'Переглянути документ' : 'View document'}
                    </a>
                  </p>
                )}

                <hr className="border-gray-100" />

                {/* HTML секції залежно від обраної мови */}
                {[
                  {
                    label: modalLang === 'uk' ? "Загальна інформація" : "General Information",
                    data: modalLang === 'uk' ? selectedPersonality.general_info : selectedPersonality.general_info_en
                  },
                  {
                    label: modalLang === 'uk' ? "Наукова діяльність" : "Scientific Activity",
                    data: modalLang === 'uk' ? selectedPersonality.scientific_activity : selectedPersonality.scientific_activity_en
                  },
                  {
                    label: modalLang === 'uk' ? "Викладацька робота" : "Teaching Work",
                    data: modalLang === 'uk' ? selectedPersonality.teaching_work : selectedPersonality.teaching_work_en
                  }
                ].map((section, idx) => section.data && (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4 py-1">
                    <p className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">{section.label}</p>
                    <div 
                      className="prose prose-blue max-w-none text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.data }} 
                    />
                  </div>
                ))}

                {selectedPersonality.links && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold mb-1">{modalLang === 'uk' ? 'Наукометричні посилання:' : 'Links:'}</p>
                    <p className="text-xs break-all text-blue-800">{selectedPersonality.links}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Футер */}
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50 rounded-b-xl">
              <button
                onClick={closeModal}
                className="bg-white border border-gray-300 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-100 transition-all font-medium shadow-sm"
              >
                {modalLang === 'uk' ? 'Закрити' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalitiesAdmin;
