import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PersonCard({ person }) {

const { i18n } = useTranslation();
  const lang = i18n.language;
  

  return (
    <Link to={`/${lang}/personalities/${person.id}`} className="block">
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
        <img
          src={person.photo}
          alt={person.fullname}
          className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
        />
        <div className="flex-grow flex flex-col">
          <h2 className="text-lg font-bold text-center mb-2">{lang === 'uk' ? person.fullname : person.fullname_en}</h2>
          <p className="text-gray-600 text-center mb-1">{lang === 'uk' ? person.scy_rank : person.scy_rank_en}</p>
          <p className="text-gray-600 text-center">{lang === 'uk' ? person.scy_position : person.scy_position_en}</p>
        </div>
      </div>

    </Link>
  );
}

export default PersonCard;
