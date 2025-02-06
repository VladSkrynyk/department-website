import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import IsLoading from './IsLoading';

import { FaEnvelope } from "react-icons/fa";

export default function SharedLayout({ language }) {
  return (
    <>
      <Header currentLanguage={language}/>
      
      <Suspense fallback={<IsLoading />}>
        <main>
          <Outlet/>
        </main>
      </Suspense>
      
      <footer className="bg-teal-700 text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
        
        {/* Колонка "Корисні посилання" */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Корисні посилання</h2>
          <ul className="space-y-1">
            <li>
              <a 
                href="https://department.univ.ua" 
                className="hover:text-teal-300"
              >
                Кафедра диференціальних та інтегральних рівнянь
              </a>
            </li>
            <li>
              <a 
                href="https://mechmat.knu.ua" 
                className="hover:text-teal-300"
              >
                Механіко-математичний факультет КНУ
              </a>
            </li>
            <li>
              <a 
                href="https://www.univ.kiev.ua" 
                className="hover:text-teal-300"
              >
                Київський національний університет ім. Тараса Шевченка
              </a>
            </li>
          </ul>
        </div>

        {/* Колонка "Контакти" */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Контакти</h2>
          <p className="flex justify-center md:justify-start items-center gap-2">
            <FaEnvelope /> 
            <a 
              href="mailto:info@department.univ.ua" 
              className="hover:text-teal-300"
            >
              info@department.univ.ua
            </a>
          </p>
        </div>
      </div>

      {/* Горизонтальна лінія */}
      <hr className="border-teal-500 my-6" />

      {/* Копірайт */}
      <p className="text-center text-sm md:text-base">
        © {new Date().getFullYear()} Кафедра диференціальних та інтегральних Рівнянь. Всі права захищені.
      </p>
    </footer>

    </>
  );
}
