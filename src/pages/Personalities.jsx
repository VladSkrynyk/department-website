import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPersonalitiesQuery } from '../redux/personalities/personalitiesApiSlice';
import PersonCard from '../components/PersonCard';

function Personalities() {
  const { t } = useTranslation();
  const { data: prlsRaw, isLoading, isError } = useGetPersonalitiesQuery();

  const prls = prlsRaw?.ids?.map(id => prlsRaw.entities[id]) || [];

  useEffect(() => {
    if (prls.length > 0) {
      console.log("Персоналії з бекенду:", prls);
    }
  }, [prls]);

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600">{t("Завантаження...")}</div>;
  }

  if (isError) {
    return <div className="text-center py-12 text-red-500">{t("Помилка завантаження даних")}</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-8 lg:px-16 pb-16">
      {/* Заголовок з лінією */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {t("personalities")}
        </h1>
        <div className="mt-2 border-b-2 border-gray-300 w-3/4 mx-auto md:w-2/3 lg:w-1/2"></div>
      </div>

      {/* Сітка з картками */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {prls.map((person) => (
          <PersonCard key={person._id || person.id} person={person} />
        ))}
      </div>
    </div>
  );
}

export default Personalities;