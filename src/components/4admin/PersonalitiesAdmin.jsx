import React, { useState } from 'react';
import { useGetUsersQuery } from "./../../redux/users/usersApiSlice"
import { personalities } from '../../stuff/data';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

function PersonalitiesAdmin() {

//   const {
//     data: users,
//     isLoading,
//     isSuccess,
//     isError,
//     error
// } = useGetUsersQuery()

// console.log(users)
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

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Адміністративна панель - Персоналії
      </h1>
      <div className="bg-gray-200 rounded-lg p-6 max-h-[calc(100vh-160px)] overflow-y-auto">
        {/* Перелік персоналій */}
        {personalities.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between bg-gray-300 text-gray-900 rounded-lg p-4 mb-4"
          >
            {/* Ім'я персоналії зліва */}
            <p className="text-lg font-semibold">{person.name}</p>

            {/* Кнопки праворуч */}
            <div className="flex space-x-4">
              <button
                onClick={() => openModal(person)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FaEye className="text-xl" />
              </button>
              <button className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition">
                <FaEdit className="text-xl" />
              </button>
              <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">
                <FaTrashAlt className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{selectedPersonality.name}</h2>
            <p>{selectedPersonality.description}</p>
            <div className="flex justify-end mt-4">
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
