import React, { useState, useEffect, useMemo } from 'react';
import { useUpdateNewsMutation } from '../../../src/redux/news/newsApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearEditingNews } from '../../../src/redux/news/newsSlice';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const box = 'bg-white rounded-md shadow p-4 md:p-6';

const inputFileCls =
  'block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded ' +
  'file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 ' +
  'hover:file:bg-blue-100';

export default function EditNews() {
  const editingNews = useSelector((state) => state.news.editingNews);
  const [updateNews, { isLoading }] = useUpdateNewsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- форма
  const [formData, setFormData] = useState({
    short_description: '',
    short_description_en: '',
    longer_description: '',
    longer_description_en: '',
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // тулбар/формати для Quill — один раз, мемо
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link'],
        ['clean'],
      ],
      history: { delay: 400, maxStack: 200, userOnly: true },
    }),
    []
  );

  const quillFormats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'align',
      'color',
      'background',
      'link',
      'clean',
    ],
    []
  );

  useEffect(() => {
    if (editingNews) {
      setFormData({
        short_description: editingNews.short_description || '',
        short_description_en: editingNews.short_description_en || '',
        longer_description: editingNews.longer_description || '',
        longer_description_en: editingNews.longer_description_en || '',
      });

      setExistingImages(Array.isArray(editingNews.photos) ? editingNews.photos : []);
    }
  }, [editingNews]);

  const handleQuill = (field) => (html) => {
    setFormData((prev) => ({ ...prev, [field]: html || '' }));
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingNews) return;

    const updatedForm = new FormData();
    Object.entries(formData).forEach(([k, v]) => updatedForm.append(k, v ?? ''));

    imageFiles.forEach((file) => updatedForm.append('photos', file));

    try {
      await updateNews({ id: editingNews.id, data: updatedForm }).unwrap();
      dispatch(clearEditingNews());
      navigate('/admin/news');
    } catch (err) {
      console.error('Помилка при оновленні новини:', err);
      alert('Не вдалося оновити новину.');
    }
  };

  if (!editingNews) return <p className="text-center mt-10 text-gray-600">Немає новини для редагування.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 md:mt-10 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Редагування новини
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ліва колонка — редактори */}
        <div className="space-y-6">
          <div className={box}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Короткий опис (UA) — заголовок
            </label>
            <ReactQuill
              theme="snow"
              value={formData.short_description}
              onChange={handleQuill('short_description')}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Заголовок українською"
              style={{ minHeight: 140 }}
            />
          </div>

          <div className={box}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short description (EN) — title
            </label>
            <ReactQuill
              theme="snow"
              value={formData.short_description_en}
              onChange={handleQuill('short_description_en')}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Title in English"
              style={{ minHeight: 140 }}
            />
          </div>

          <div className={box}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Повний опис (UA)
            </label>
            <ReactQuill
              theme="snow"
              value={formData.longer_description}
              onChange={handleQuill('longer_description')}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Основний текст українською"
              style={{ minHeight: 200 }}
            />
          </div>

          <div className={box}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full description (EN)
            </label>
            <ReactQuill
              theme="snow"
              value={formData.longer_description_en}
              onChange={handleQuill('longer_description_en')}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Main text in English"
              style={{ minHeight: 200 }}
            />
          </div>

          <div className={box}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Нові фото (можна декілька)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={inputFileCls}
            />
            {imageFiles?.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Обрано файлів: <span className="font-medium">{imageFiles.length}</span>
              </p>
            )}
          </div>
        </div>

        {/* Права колонка — превʼю та поточні фото */}
        <div className="space-y-6">
          {/* Live preview заголовку (UA) */}
          <div className={box}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Превʼю заголовка (UA)</p>
            <div
              className="prose prose-sm md:prose max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.short_description || '') }}
            />
          </div>

          {/* Live preview заголовка (EN) */}
          <div className={box}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Title preview (EN)</p>
            <div
              className="prose prose-sm md:prose max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.short_description_en || '') }}
            />
          </div>

          {/* Live preview контенту (UA) */}
          <div className={box}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Превʼю тексту (UA)</p>
            <div
              className="prose prose-sm md:prose max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.longer_description || '') }}
            />
          </div>

          {/* Поточні фото */}
          {existingImages?.length > 0 && (
            <div className={box}>
              <p className="text-sm font-semibold text-gray-800 mb-3">Поточні фото</p>
              <div className="grid grid-cols-3 gap-3">
                {existingImages.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Фото ${idx + 1}`}
                    className="w-full aspect-square object-cover rounded shadow-sm"
                    loading="lazy"
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                * Поточні фото залишаться, якщо ви не завантажите нові (або бекенд не видаляє їх за логікою).
              </p>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition disabled:opacity-50"
            >
              {isLoading ? 'Оновлюється...' : 'Оновити новину'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/news')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded transition"
            >
              Скасувати
            </button>
          </div>
        </div>
      </form>

      {/* Підказки по форматуванню */}
      <div className="mt-8 text-sm text-gray-600">
        <p className="font-semibold mb-1">Підказки:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><b>Абзац</b> — натисніть <kbd>Enter</kbd>; <b>перенесення рядка</b> — <kbd>Shift</kbd> + <kbd>Enter</kbd>.</li>
          <li>Виділення — кнопки <b>B</b>, <i>I</i>, <u>U</u> на панелі.</li>
          <li>Посилання — виділіть текст → кнопка «Link» у тулбарі.</li>
          <li>Заголовки H1/H2/H3 — перша кнопка тулбару «Header».</li>
        </ul>
      </div>
    </div>
  );
}
