import React from 'react';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">Ой! Такої сторінки не існує.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
          >
            На головну
          </Link>
        </div>
      );
}

export default NotFound;
