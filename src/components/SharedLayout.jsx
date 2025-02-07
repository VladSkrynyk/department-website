import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import IsLoading from './IsLoading';

import { FaEnvelope } from "react-icons/fa";

export default function SharedLayout({ language }) {
  return (
    <>
      <Header currentLanguage={language} />

      <Suspense fallback={<IsLoading />}>
        <main>
          <Outlet />
        </main>
      </Suspense>

      <footer className="bg-teal-700 text-white py-6 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left">

          {/* Колонка "Корисні посилання" */}
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-2">Корисні посилання</h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li>
                <a href="https://department.univ.ua" className="hover:text-teal-300">
                  Кафедра диференціальних та інтегральних рівнянь
                </a>
              </li>
              <li>
                <a href="https://mechmat.knu.ua" className="hover:text-teal-300">
                  Механіко-математичний факультет КНУ
                </a>
              </li>
              <li>
                <a href="https://www.univ.kiev.ua" className="hover:text-teal-300">
                  Київський національний університет ім. Тараса Шевченка
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка "Контакти" */}
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-2">Контакти</h2>
            <p className="flex justify-center md:justify-start items-center gap-2 text-sm md:text-base">
              <FaEnvelope />
              <a href="mailto:knu.diffeq@gmail.com" className="hover:text-teal-300">
                knu.diffeq@gmail.com
              </a>
            </p>
          </div>

          {/* Додаткова колонка для ноутбуків */}
          <div className="hidden lg:block">
            <h2 className="text-base md:text-lg font-semibold mb-2">Соцмережі</h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-teal-300">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-300">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-300">Telegram</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Горизонтальна лінія */}
        <hr className="border-teal-500 my-6" />

        {/* Копірайт */}
        <p className="text-center text-xs md:text-sm lg:text-base">
          © {new Date().getFullYear()} Кафедра диференціальних та інтегральних рівнянь. Всі права захищені.
        </p>
      </footer>



    </>
  );
}
