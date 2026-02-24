import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdatePersonalityMutation } from '../../../src/redux/personalities/personalitiesApiSlice';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const fieldLabels = {
  fullname: "Ім'я",
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

// які поля робимо rich-text
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
  const [updatePersonality] = useUpdatePersonalityMutation();
  const [imageFile, setImageFile] = useState(null);

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

  // тулбар/дозволені формати для Quill
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRichChange = (field) => (html) => {
    setFormData((prev) => ({ ...prev, [field]: html }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async () => {
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
        id: editingPersonality._id,
        data: formDataToSend,
      }).unwrap();
      alert('Дані успішно оновлено!');
    } catch (err) {
      console.error('Помилка оновлення:', err);
      alert('Помилка при оновленні даних.');
    }
  };

  if (!editingPersonality) {
    return <p className="text-center text-gray-700">Дані для редагування не знайдено.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-8 overflow-y-auto">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Редагування персоналії
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-h-[75vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => {
          // поле фото окремо, ми його не рендеримо тут
          if (key === 'photo') return null;

          const label = fieldLabels[key] || key;

          // для rich-text полів — ReactQuill
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

          // звичайні поля — input
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
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          );
        })}

        {/* Фото (нове) */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="photo">
            Фото (нове)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => console.log("Дані:", formData, "Файл:", imageFile)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Переглянути введене
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Зберегти
        </button>
      </div>
    </div>
  );
}

export default EditPersonality;
