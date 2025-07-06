import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// TODO: реалізуй ці хуки відповідно до newsApiSlice
import { useGetNewsQuery, useDeleteNewsMutation } from '../../redux/news/newsApiSlice';
// import { setEditingNews } from '../../redux/news/newsSlice';

function NewsAdmin() {
  const { data: newsRaw, isLoading, isError } = useGetNewsQuery();
  // const [deleteNews] = useDeleteNewsMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  const news = newsRaw?.ids?.map(id => newsRaw.entities[id]) || [];

  console.log(news);
  

  const handleEdit = (newsItem) => {
    // dispatch(setEditingNews(newsItem));
    // navigate('/admin/edit-news');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Ти впевнений, що хочеш видалити цю новину?')) {
      try {
        // await deleteNews(id).unwrap();
        // console.log(`Новину з id ${id} успішно видалено.`);
      } catch (error) {
        console.error('Помилка при видаленні:', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Адміністративна панель – Новини
        </h1>
        <Link to="/admin/add-news">
          <button
            className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-2xl rounded"
            title="Додати новину"
          >
            +
          </button>
        </Link>
      </div>

      {/* {isLoading && <p className="text-center text-gray-700">Завантаження...</p>}
      {isError && <p className="text-center text-red-600">Помилка завантаження новин</p>} */}

      <div className="bg-gray-200 rounded-lg p-6 max-h-[calc(100vh-160px)] overflow-y-auto">
        {/* Заміни мокові новини на: news.map(...) */}
        {[{ id: 1, title: 'Заголовок новини', date: '2025-05-01' }].map((newsItem) => (
          <div
            key={newsItem.id}
            className="flex items-center justify-between bg-gray-300 text-gray-900 rounded-lg p-4 mb-4"
          >
            <p className="text-lg font-semibold">{newsItem.title}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => openModal(newsItem)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FaEye className="text-xl" />
              </button>
              <button
                onClick={() => handleEdit(newsItem)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
              >
                <FaEdit className="text-xl" />
              </button>
              <button
                onClick={() => handleDelete(newsItem.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaTrashAlt className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальне вікно перегляду новини */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
              {selectedNews.title || 'Без заголовка'}
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>Дата:</strong> {selectedNews.date || 'Невідомо'}</p>
              {/* Додати інші поля новини */}
              <p><strong>Опис:</strong><br />{selectedNews.content || 'Без опису'}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsAdmin;
