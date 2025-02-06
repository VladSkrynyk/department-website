import { Link } from 'react-router-dom';

import React from 'react';
import { personalities } from '../stuff/data';
import PersonCard from '../components/PersonCard';

function Personalities() {
  return (
    <div className="container mx-auto py-6 px-4">
  <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 pt-8">
        Персоналії
      </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {personalities.map((person) => (
      <PersonCard key={person.id} person={person} />
    ))}
  </div>
</div>

  );
}

export default Personalities;
