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

  const openModal = (person) => {
    setSelectedPersonality(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPersonality(null);
    setIsModalOpen(false);
  };

  // Формуємо масив персоналій із отриманих даних
  const personalities = personalitiesRaw?.ids?.map(id => personalitiesRaw.entities[id]) || [];

  const handleEdit = (person) => {
    dispatch(setEditingPersonality(person)); // Зберігаємо в Redux
    navigate('/admin/edit-personality'); // Переходимо на сторінку редагування
  }

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
      <div className="bg-gray-100 py-6 px-8">
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
        {/* Інша частина сторінки */}
      </div>
      {isLoading && <p className="text-center text-gray-700">Завантаження...</p>}
      {isError && <p className="text-center text-red-600">Помилка завантаження даних</p>}

      <div className="bg-gray-200 rounded-lg p-6 max-h-[calc(100vh-160px)] overflow-y-auto">
        {personalities.map((person) => (
          <div
            key={person?.id}
            className="flex items-center justify-between bg-gray-300 text-gray-900 rounded-lg p-4 mb-4"
          >

            <p className="text-lg font-semibold">{person?.fullname || "Невідомий ступінь"}</p>

            <div className="flex space-x-4">
              <button
                onClick={() => openModal(person)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FaEye className="text-xl" />
              </button>
              <button
                onClick={() => handleEdit(person)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
              >
                <FaEdit className="text-xl" />
              </button>
              <button
                onClick={() => handleDelete(person.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">
                <FaTrashAlt className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальне вікно */}
{isModalOpen && selectedPersonality && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-xl w-full max-w-3xl flex flex-col max-h-[90vh] shadow-2xl relative">
      
      {/* Кнопка-хрестик зверху справа */}
      <button 
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Шапка модалки (фіксована) */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {selectedPersonality.fullname || "Без імені"}
        </h2>
      </div>

      {/* Тіло модалки (Тільки воно буде скролитися) */}
      <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
        
        {/* Фото */}
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
          {/* Основні дані */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <p><strong>Науковий ступінь:</strong> {selectedPersonality.scy_degree || "—"}</p>
            <p><strong>Наукове звання:</strong> {selectedPersonality.scy_rank || "—"}</p>
            <p><strong>Посада:</strong> {selectedPersonality.scy_position || "—"}</p>
            <p><strong>Email:</strong> <span className="text-blue-600">{selectedPersonality.contact_email || "—"}</span></p>
          </div>

          <p><strong>Місце перебування:</strong> {selectedPersonality.contact_place || "Не вказано"}</p>
          
          {selectedPersonality.cv && (
            <p><strong>CV:</strong> <a href={selectedPersonality.cv} className="text-blue-500 hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">Переглянути документ</a></p>
          )}

          <hr className="border-gray-100" />

          {/* HTML секції */}
          {[
            { label: "Загальна інформація", data: selectedPersonality.general_info },
            { label: "Наукова діяльність", data: selectedPersonality.scientific_activity },
            { label: "Викладацька робота", data: selectedPersonality.teaching_work }
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
              <p className="font-bold mb-1">Наукометричні посилання:</p>
              <p className="text-xs break-all text-blue-800">{selectedPersonality.links}</p>
            </div>
          )}
        </div>
      </div>

      {/* Футер (фіксований знизу) */}
      <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50 rounded-b-xl">
        <button
          onClick={closeModal}
          className="bg-white border border-gray-300 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-100 transition-all font-medium shadow-sm"
        >
          Закрити
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default PersonalitiesAdmin;
