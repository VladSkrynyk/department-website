import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdatePersonalityMutation } from '../../../src/redux/personalities/personalitiesApiSlice';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const fieldLabels = {
  fullname: "Ім'я *",
  fullname_en: "Ім'я (англійською)",
  scy_degree: "Науковий ступінь",
  scy_degree_en: "Науковий ступінь (англійською)",
  scy_rank: "Вчене звання",
  scy_rank_en: "Вчене звання (англійською)",
  scy_position: "Посада",
  scy_position_en: "Посада (англійською)",
  general_info: "Загальна інформація",
  general_info_en: "Загальна інформація (англійською)",
  teaching_work: "Навчальна діяльність",
  teaching_work_en: "Навчальна діяльність (англійською)",
  scientific_activity: "Наукова діяльність",
  scientific_activity_en: "Наукова діяльність (англійською)",
  contact_email: "Електронна пошта",
  contact_place: "Місце перебування",
  cv: "Посилання на CV",
  links: "Посилання (через кому)",
};

const RICH_FIELDS = new Set([
  'general_info',
  'general_info_en',
  'teaching_work',
  'teaching_work_en',
  'scientific_activity',
  'scientific_activity_en',
]);

function EditPersonality() {
  const editingPersonality = useSelector((state) => state.personality.editingPersonality);
  const [updatePersonality, { isLoading }] = useUpdatePersonalityMutation();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const parseLinks = (linksRaw) => {
    if (!linksRaw) return '';
    try {
      const parsed = typeof linksRaw === 'string' ? JSON.parse(linksRaw) : linksRaw;
      return Array.isArray(parsed) ? parsed.join(', ') : '';
    } catch {
      return '';
    }
  };

  const [formData, setFormData] = useState(() => ({
    fullname: editingPersonality?.fullname || '',
    fullname_en: editingPersonality?.fullname_en || '',
    scy_degree: editingPersonality?.scy_degree || '',
    scy_degree_en: editingPersonality?.scy_degree_en || '',
    scy_rank: editingPersonality?.scy_rank || '',
    scy_rank_en: editingPersonality?.scy_rank_en || '',
    scy_position: editingPersonality?.scy_position || '',
    scy_position_en: editingPersonality?.scy_position_en || '',
    general_info: editingPersonality?.general_info || '',
    general_info_en: editingPersonality?.general_info_en || '',
    teaching_work: editingPersonality?.teaching_work || '',
    teaching_work_en: editingPersonality?.teaching_work_en || '',
    scientific_activity: editingPersonality?.scientific_activity || '',
    scientific_activity_en: editingPersonality?.scientific_activity_en || '',
    contact_email: editingPersonality?.contact_email || '',
    contact_place: editingPersonality?.contact_place || '',
    cv: editingPersonality?.cv || '',
    links: parseLinks(editingPersonality?.links),
  }));

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
    history: { delay: 500, maxStack: 100, userOnly: true },
  }), []);

  const quillFormats = useMemo(() => ([
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'color', 'background',
    'link',
    'clean',
  ]), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Очищаємо помилку поля під час введення
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRichChange = (field) => (html) => {
    setFormData((prev) => ({ ...prev, [field]: html }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  // Метод перевірки форми
  const validateForm = () => {
    const newErrors = {};

    // 1. Ім'я обов'язкове
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Ім'я є обов'язковим для заповнення";
    }

    // 2. Якщо email вказано — він має бути коректним
    if (formData.contact_email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contact_email.trim())) {
        newErrors.contact_email = "Введіть коректну адресу електронної пошти";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formDataToSend = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (key === 'links') {
        formDataToSend.append(
          key,
          JSON.stringify(
            (value || '')
              .split(',')
              .map((link) => link.trim())
              .filter(Boolean)
          )
        );
      } else {
        formDataToSend.append(key, value ?? '');
      }
    }

    if (imageFile) {
      formDataToSend.append('photo', imageFile);
    }

    try {
      await updatePersonality({
        id: editingPersonality._id || editingPersonality.id,
        data: formDataToSend,
      }).unwrap();
      alert('Дані успішно оновлено!');
      navigate('/admin/personalities');
    } catch (err) {
      console.error('Помилка оновлення:', err);
      alert('Помилка при оновленні даних.');
    }
  };

  if (!editingPersonality) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700 text-lg mb-4">Дані для редагування не знайдено.</p>
        <button
          onClick={() => navigate('/admin/personalities')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Повернутися до списку
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-8 overflow-y-auto">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Редагування персоналії
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-h-[75vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'photo') return null;

          const label = fieldLabels[key] || key;
          const hasError = !!errors[key];

          if (RICH_FIELDS.has(key)) {
            return (
              <div key={key} className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor={key}>
                  {label}
                </label>
                <div className="border border-gray-300 rounded">
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={handleRichChange(key)}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder={label}
                    style={{ minHeight: 180 }}
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={key}>
              <label className="block text-gray-700 font-medium mb-1" htmlFor={key}>
                {label}
              </label>
              <input
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 outline-none transition ${hasError
                  ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500'
                  }`}
              />
              {hasError && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          );
        })}

        {/* Фото */}
        {/* Фото */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-gray-700 font-medium mb-2">
            Фотографія персоналії
          </label>

          <div className="flex items-center gap-6">
            {/* Поточне або нове обране фото */}
            {(imageFile || editingPersonality?.photo) && (
              <div className="relative">
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : editingPersonality.photo}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border-2 border-blue-500 shadow-sm"
                />
                <span className="text-xs block text-center mt-1 text-gray-500">
                  {imageFile ? 'Нове фото' : 'Поточне'}
                </span>
              </div>
            )}

            <div className="flex-grow">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Залиште це поле порожнім, якщо не плануєте змінювати фотографію.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => navigate('/admin/personalities')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Скасувати
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
    </div>
  );
}

export default EditPersonality;
