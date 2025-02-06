import React from 'react';
import Counter from '../components/Counter';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import main_back_logo from "./../stuff/images/main_back_logo.jpg"


function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
  {/* Фонове зображення */}
  <img
    src={main_back_logo}
    alt="Фонове зображення"
    className="absolute inset-0 w-full h-full object-cover opacity-50"
  />

  {/* Контейнер з текстом */}
  <div className="relative container mx-auto text-left py-6 px-6 md:px-12">
    <h1 className="text-4xl md:text-6xl font-extrabold text-teal-800 leading-tight max-w-screen-lg">
      КАФЕДРА ДИФЕРЕНЦІАЛЬНИХ <br /> ТА ІНТЕГРАЛЬНИХ РІВНЯНЬ
    </h1>
  </div>
</div>

  );
}

export default Home;
