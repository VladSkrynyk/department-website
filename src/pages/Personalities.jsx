import { Link } from 'react-router-dom';

import React from 'react';
import { personalities } from '../stuff/data';
import PersonCard from '../components/PersonCard';

function Personalities() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-8 lg:px-16">
      {/* Заголовок з лінією */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Персоналії</h1>
        <div className="mt-2 border-b-2 border-gray-300 w-3/4 mx-auto md:w-2/3 lg:w-1/2"></div>
      </div>

      {/* Сітка з картками */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {personalities.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>


  );
}

export default Personalities;
