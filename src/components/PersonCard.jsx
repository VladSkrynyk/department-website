import React from 'react';
import { Link } from 'react-router-dom';

function PersonCard({ person }) {
  return (
    <Link to={`/personalities/${person.id}`} className="block">
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
        <img
          src={person.photo}
          alt={person.name}
          className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
        />
        <h2 className="text-lg font-bold text-center mb-2">{person.name}</h2>
        <p className="text-gray-600 text-center mb-1">{person.degree}</p>
        <p className="text-gray-600 text-center">{person.position}</p>
      </div>
    </Link>
  );
}

export default PersonCard;
