import React from 'react';
import { useParams } from 'react-router-dom';
import { personalities } from '../stuff/data';
import { Link } from 'react-router-dom';


function PersonDetails() {
  const { id } = useParams(); // Отримуємо динамічний параметр `id` з URL
  const person = personalities.find((p) => p.id.toString() === id); // Шукаємо людину за `id`


  if (!person) {
    return <div className="text-center text-red-500 mt-10">Людину не знайдено.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={person.photo}
            alt={person.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto md:mx-0 md:ml-6 mt-6 md:mt-0 object-cover"
          />
          <div className="p-6 flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{person.name}</h1>
            <p className="text-gray-600 text-lg">{person.degree}</p>
            <p className="text-gray-600">{person.position}</p>
            <p className="mt-4 text-gray-700 text-justify">{person.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
