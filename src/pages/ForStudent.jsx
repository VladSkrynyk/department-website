import React from 'react';
import img1 from "../stuff/images/schedule.jpg";
import img2 from "../stuff/images/scyart.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ForStudent() {

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const cards = [
    {
      
      to: `/${lang}/student/schedule`, // або `/${currentLang}/students/schedule` якщо треба з мовою
      title: "Розклад",
      desc: "Актуальний розклад занять, консультацій та сесій.",
      img: img1, // заміни на scheduleImg
    },
    {
      to: `/${lang}/student/topics`,
      title: "Теми наукових робіт",
      desc: "Перелік тем курсових/бакалаврських/магістерських робіт та керівників.",
      img: img2, // заміни на topicsImg
    },
  ];

  return (
    <div className="min-h-[70vh] bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Сторінка студента
          </h1>
          <div className="mt-4 w-24 h-1 bg-blue-600 mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Оберіть розділ: переглянути розклад або ознайомитись із темами наукових робіт.
          </p>
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full aspect-[16/9] object-cover"
                  loading="lazy"
                />
                {/* Легкий градієнт внизу для кращої читабельності підписів */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {c.title}
                </h2>
                <p className="text-gray-600">{c.desc}</p>
                <div className="mt-4 inline-flex items-center text-blue-600 font-medium group-hover:underline">
                  Перейти
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Нижня лінія для завершеності сторінки */}
        <div className="mt-12 border-t border-gray-200"></div>
      </div>
    </div>
  );
}

export default ForStudent;
