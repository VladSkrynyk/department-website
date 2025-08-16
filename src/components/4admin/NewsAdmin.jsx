import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { setEditingNews } from '../../redux/news/newsSlice';
import { useGetNewsQuery, useDeleteNewsMutation } from '../../redux/news/newsApiSlice';
import DOMPurify from 'dompurify';

// Проста утиліта, щоб дістати текст із HTML для заголовка у списку
const htmlToText = (html = '') =>
  typeof html === 'string' ? html.replace(/<[^>]+>/g, '').trim() : '';

function NewsAdmin() {
  const { data: newsRaw, isLoading, isError } = useGetNewsQuery();
  const [deleteNews] = useDeleteNewsMutation();
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

  const handleEdit = (newsItem) => {
    dispatch(setEditingNews(newsItem));
    navigate('/admin/edit-news');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ти впевнений, що хочеш видалити цю новину?")) {
      try {
        await deleteNews(id).unwrap();
        console.log("Новину видалено");
      } catch (err) {
        console.error("Помилка при видаленні:", err);
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

      {/* Стани завантаження/помилки за бажанням */}
      {/* {isLoading && <p className="text-center text-gray-700">Завантаження...</p>}
      {isError && <p className="text-center text-red-600">Помилка завантаження новин</p>} */}

      <div className="bg-gray-200 rounded-lg p-6 max-h-[calc(100vh-160px)] overflow-y-auto">
        {news.map((newsItem) => {
          // Заголовок зі "short_description" як plain-текст
          const title = htmlToText(newsItem.short_description) || 'Без заголовка';
          return (
            <div
              key={newsItem.id}
              className="flex items-center justify-between bg-gray-300 text-gray-900 rounded-lg p-4 mb-4"
            >
              <p className="text-lg font-semibold line-clamp-2">{title}</p>
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
          );
        })}
      </div>

      {/* Модалка перегляду новини */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[900px] max-h-[85vh] overflow-y-auto">
            {/* Заголовок з short_description як HTML (санітизовано) */}
            <div className="mb-3">
              <h2
                className="text-2xl font-bold text-center"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedNews.short_description || 'Без заголовка'),
                }}
              />
            </div>

            {/* Дати */}
            <div className="text-sm text-gray-600 mb-4 text-center">
              <span className="mr-3">
                <strong>Створено:</strong>{' '}
                {selectedNews.createdAt
                  ? format(new Date(selectedNews.createdAt), 'dd.MM.yyyy, HH:mm', { locale: uk })
                  : 'Невідомо'}
              </span>
              <span>
                <strong>Останнє оновлення:</strong>{' '}
                {selectedNews.updatedAt
                  ? format(new Date(selectedNews.updatedAt), 'dd.MM.yyyy, HH:mm', { locale: uk })
                  : 'Невідомо'}
              </span>
            </div>

            {/* Повний опис як відформатований HTML */}
            <div
              className="prose max-w-none prose-headings:mt-4 prose-p:my-3"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedNews.longer_description || '<p><em>Без опису</em></p>'),
              }}
            />

            {/* Англійські версії (за потреби) */}
            <div className="mt-8 border-t pt-4">
              <p className="font-semibold mb-2">English Title:</p>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedNews.short_description_en || '<p><em>No title</em></p>'),
                }}
              />
              <p className="font-semibold mt-4 mb-2">English Full Description:</p>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedNews.longer_description_en || '<p><em>No description</em></p>'),
                }}
              />
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
