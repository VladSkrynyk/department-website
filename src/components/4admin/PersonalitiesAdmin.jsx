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
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
      
      {/* Фото по центру */}
      {selectedPersonality.photo && (
        <div className="flex justify-center mb-4">
          <img
            src={selectedPersonality.photo}
            alt={selectedPersonality.fullname}
            className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
          />
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-4">
        {selectedPersonality.fullname || "Без імені"}
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Науковий ступінь:</strong> {selectedPersonality.scy_degree || "Невідомо"}</p>
        <p><strong>Наукове звання:</strong> {selectedPersonality.scy_rank || "Невідомо"}</p>
        <p><strong>Посада:</strong> {selectedPersonality.scy_position || "Невідомо"}</p>
        <p><strong>Email:</strong> {selectedPersonality.contact_email || "Немає"}</p>
        <p><strong>Місце перебування:</strong> {selectedPersonality.contact_place || "Немає"}</p>
        <p><strong>CV:</strong> {selectedPersonality.cv ? (
          <a href={selectedPersonality.cv} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Переглянути</a>
        ) : "Немає"}</p>
        <p><strong>Загальна інформація:</strong><br />{selectedPersonality.general_info || "Немає"}</p>
        <p><strong>General Info (EN):</strong><br />{selectedPersonality.general_info_en || "Немає"}</p>
        <p><strong>Наукова діяльність:</strong><br />{selectedPersonality.scientific_activity || "Немає"}</p>
        <p><strong>Scientific Activity (EN):</strong><br />{selectedPersonality.scientific_activity_en || "Немає"}</p>
        <p><strong>Викладацька робота:</strong><br />{selectedPersonality.teaching_work || "Немає"}</p>
        <p><strong>Teaching Work (EN):</strong><br />{selectedPersonality.teaching_work_en || "Немає"}</p>
        <p><strong>Links:</strong><br />{selectedPersonality.links || "Немає"}</p>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={closeModal}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
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
