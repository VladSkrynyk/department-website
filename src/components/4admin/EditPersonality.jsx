import React from 'react';
import { useSelector } from 'react-redux';

function EditPersonality() {
  const editingPersonality = useSelector(state => state.personality.editingPersonality);

  console.log("Редагуємо персоналію:", editingPersonality);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Редагування персоналії
      </h1>
      {editingPersonality ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p><strong>ID:</strong> {editingPersonality.id}</p>
          <p><strong>Науковий ступінь:</strong> {editingPersonality.scy_degree}</p>
          <p><strong>Опис:</strong> {editingPersonality.description}</p>
        </div>
      ) : (
        <p className="text-center text-gray-700">Дані для редагування не знайдено.</p>
      )}
    </div>
  );
}

export default EditPersonality;
