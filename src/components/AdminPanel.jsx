import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { NavLink, Route, Routes } from "react-router-dom";
import { FaNewspaper, FaUsers, FaBook, FaGraduationCap } from "react-icons/fa";

import NewsAdmin from "./4admin/NewsAdmin";
import PersonalitiesAdmin from "./4admin/PersonalitiesAdmin";
import PublicationsAdmin from "./4admin/PublicationsAdmin";
import StudentsAdmin from "./4admin/StudentsAdmin";

function AdminPanel() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // Перевірка: якщо користувач не є адміном, перенаправити його
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100 -mt-16">
    {/* Бічне меню */}
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold text-center">Admin Panel</h2>
      <nav className="space-y-2">
        <NavItem to="news" icon={<FaNewspaper />} label="Новини" />
        <NavItem to="personalities" icon={<FaUsers />} label="Персоналії" />
        <NavItem to="publications" icon={<FaBook />} label="Публікації" />
        <NavItem to="students" icon={<FaGraduationCap />} label="Для студента" />
      </nav>
    </aside>

    {/* Основний контент */}
    <div className="flex-1 p-6 bg-white shadow-md">
      <Routes>
        <Route path="news" element={<NewsAdmin />} />
        <Route path="personalities" element={<PersonalitiesAdmin />} />
        <Route path="publications" element={<PublicationsAdmin />} />
        <Route path="students" element={<StudentsAdmin />} />
      </Routes>
    </div>
  </div>
  );
}

// Компонент для пункту меню
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={`/admin/${to}`}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-lg transition ${
          isActive ? "bg-gray-700" : "hover:bg-gray-600"
        }`
      }
    >
      <span className="mr-2 text-lg">{icon}</span> {label}
    </NavLink>
  );
}

export default AdminPanel;
