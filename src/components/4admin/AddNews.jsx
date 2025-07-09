import React, { useState } from 'react';
import { useAddNewsMutation } from '../../../src/redux/news/newsApiSlice';

import { useNavigate } from 'react-router-dom';

const inputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
  fontSize: '14px'
};

const textareaStyle = {
  ...inputStyle,
  height: '100px'
};

const AddNews = () => {
  const [formData, setFormData] = useState({
    short_description: '',
    short_description_en: '',
    longer_description: '',
    longer_description_en: '',
  });

  const [photos, setPhotos] = useState([]);
  const [addNews, { isLoading }] = useAddNewsMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    photos.forEach((photo, index) => {
      formDataToSend.append('photos', photo); // name expected on backend: `photos`
    });

    try {
      await addNews(formDataToSend).unwrap();
      navigate('/admin/news');
    } catch (error) {
      console.error('Помилка при додаванні новини:', error);
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Додати новину
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label>Короткий опис</label>
          <textarea
            name="short_description"
            placeholder="Короткий опис"
            value={formData.short_description}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        <div>
          <label>Short Description (EN)</label>
          <textarea
            name="short_description_en"
            placeholder="Short Description (EN)"
            value={formData.short_description_en}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        <div>
          <label>Повний опис</label>
          <textarea
            name="longer_description"
            placeholder="Повний опис"
            value={formData.longer_description}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        <div>
          <label>Longer Description (EN)</label>
          <textarea
            name="longer_description_en"
            placeholder="Longer Description (EN)"
            value={formData.longer_description_en}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        <div>
          <label>Фото (мінімум 2)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            style={inputStyle}
          />
          {photos.length > 0 && (
            <p style={{ fontSize: '13px', color: '#555' }}>{photos.length} файл(ів) вибрано</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#16a34a',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isLoading ? 'Додається...' : 'Додати новину'}
          </button>

          <button
            type="button"
            onClick={() => console.log({ ...formData, photos })}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Перевірити
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNews;
