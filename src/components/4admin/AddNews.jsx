// import React, { useState } from 'react';
// import { useAddNewsMutation } from '../../../src/redux/news/newsApiSlice';
// // "../../stuff/images" посилання на дві фотографії
// import { useNavigate } from 'react-router-dom';

// import RichTextEditor from '../../components/RichTextEditor' ;

// const inputStyle = {
//   padding: '10px',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
//   width: '100%',
//   fontSize: '14px'
// };

// const textareaStyle = {
//   ...inputStyle,
//   height: '100px'
// };

// const AddNews = () => {
//   const [formData, setFormData] = useState({
//     short_description: '',
//     short_description_en: '',
//     longer_description: '',
//     longer_description_en: '',
//   });

//   const [photos, setPhotos] = useState([]);
//   const [addNews, { isLoading }] = useAddNewsMutation();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handleChangeRte = (field) => (html) => {
//     setFormData((prev) => ({ ...prev, [field]: html }));
//   };

//   const handlePhotoChange = (e) => {
//     setPhotos(Array.from(e.target.files));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });

//     photos.forEach((photo, index) => {
//       formDataToSend.append('photos', photo); // name expected on backend: `photos`
//     });

//     try {
//       await addNews(formDataToSend).unwrap();
//       navigate('/admin/news');
//     } catch (error) {
//       console.error('Помилка при додаванні новини:', error);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: '800px',
//         margin: '40px auto',
//         padding: '24px',
//         backgroundColor: '#fff',
//         borderRadius: '8px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       }}
//     >
//       <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
//         Додати новину
//       </h2>

//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//         <div>
//           <label>Короткий опис</label>
//           <textarea
//             name="short_description"
//             placeholder="Короткий опис"
//             value={formData.short_description}
//             onChange={handleChange}
//             style={textareaStyle}
//           />
//         </div>

//         <div>
//           <label>Short Description (EN)</label>
//           <textarea
//             name="short_description_en"
//             placeholder="Short Description (EN)"
//             value={formData.short_description_en}
//             onChange={handleChange}
//             style={textareaStyle}
//           />
//         </div>

//         <div>
//           <label>Повний опис</label>
//           <textarea
//             name="longer_description"
//             placeholder="Повний опис"
//             value={formData.longer_description}
//             onChange={handleChange}
//             style={textareaStyle}
//           />
//         </div>

//         <div>
//           <label>Longer Description (EN)</label>
//           <textarea
//             name="longer_description_en"
//             placeholder="Longer Description (EN)"
//             value={formData.longer_description_en}
//             onChange={handleChange}
//             style={textareaStyle}
//           />
//         </div>

//         <div>
//           <label>Фото (мінімум 2)</label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handlePhotoChange}
//             style={inputStyle}
//           />
//           {photos.length > 0 && (
//             <p style={{ fontSize: '13px', color: '#555' }}>{photos.length} файл(ів) вибрано</p>
//           )}
//         </div>

//         <div style={{ display: 'flex', gap: '12px' }}>
//           <button
//             type="submit"
//             disabled={isLoading}
//             style={{
//               backgroundColor: '#16a34a',
//               color: '#fff',
//               padding: '10px 20px',
//               borderRadius: '6px',
//               border: 'none',
//               cursor: 'pointer',
//             }}
//           >
//             {isLoading ? 'Додається...' : 'Додати новину'}
//           </button>

//           <button
//             type="button"
//             onClick={() => console.log({ ...formData, photos })}
//             style={{
//               backgroundColor: '#2563eb',
//               color: '#fff',
//               padding: '10px 20px',
//               borderRadius: '6px',
//               border: 'none',
//               cursor: 'pointer',
//             }}
//           >
//             Перевірити
//           </button>
//         </div>
//       </form>
//     </div>

//   );
// };

// export default AddNews;

import React, { useState, useMemo } from 'react';
import { useAddNewsMutation } from '../../../src/redux/news/newsApiSlice';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const inputStyle = { padding: '10px', borderRadius: 4, border: '1px solid #ccc', width: '100%', fontSize: 14 };

export default function AddNews() {
  const [formData, setFormData] = useState({
    short_description: '',
    short_description_en: '',
    longer_description: '',
    longer_description_en: '',
  });
  const [photos, setPhotos] = useState([]);
  const [addNews, { isLoading }] = useAddNewsMutation();
  const navigate = useNavigate();

  // ✅ Один спільний набір модулів/форматів для всіх редакторів
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
    // Можна підкрутити поведінку клавіш, історії, тощо
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

  const handleChangeRte = (field) => (html) =>
    setFormData((prev) => ({ ...prev, [field]: html }));

  const handlePhotoChange = (e) => setPhotos(Array.from(e.target.files || []));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v ?? ''));
    photos.forEach((file) => fd.append('photos', file));

    try {
      await addNews(fd).unwrap();
      navigate('/admin/news');
    } catch (err) {
      console.error('Помилка при додаванні новини:', err);
      alert('Помилка при додаванні новини');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Додати новину</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* UA short */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Короткий опис</label>
          <div style={{ border: '1px solid #ddd', borderRadius: 6 }}>
            <ReactQuill
              theme="snow"
              value={formData.short_description}
              onChange={handleChangeRte('short_description')}
              placeholder="Короткий опис"
              modules={quillModules}
              formats={quillFormats}
              style={{ minHeight: 160 }}
            />
          </div>
        </div>

        {/* EN short */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Short Description (EN)</label>
          <div style={{ border: '1px solid #ddd', borderRadius: 6 }}>
            <ReactQuill
              theme="snow"
              value={formData.short_description_en}
              onChange={handleChangeRte('short_description_en')}
              placeholder="Short description (EN)"
              modules={quillModules}
              formats={quillFormats}
              style={{ minHeight: 160 }}
            />
          </div>
        </div>

        {/* UA long */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Повний опис</label>
          <div style={{ border: '1px solid #ddd', borderRadius: 6 }}>
            <ReactQuill
              theme="snow"
              value={formData.longer_description}
              onChange={handleChangeRte('longer_description')}
              placeholder="Повний опис"
              modules={quillModules}
              formats={quillFormats}
              style={{ minHeight: 220 }}
            />
          </div>
        </div>

        {/* EN long */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Full description (EN)</label>
          <div style={{ border: '1px solid #ddd', borderRadius: 6 }}>
            <ReactQuill
              theme="snow"
              value={formData.longer_description_en}
              onChange={handleChangeRte('longer_description_en')}
              placeholder="Full description (EN)"
              modules={quillModules}
              formats={quillFormats}
              style={{ minHeight: 220 }}
            />
          </div>
        </div>

        {/* Photos */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Фото (можна кілька)</label>
          <input type="file" accept="image/*" multiple onChange={handlePhotoChange} style={inputStyle} />
          {photos.length > 0 && (
            <p style={{ fontSize: 13, color: '#555', marginTop: 6 }}>Обрано файлів: {photos.length}</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{ background: '#16a34a', color: '#fff', padding: '10px 20px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
          >
            {isLoading ? 'Додається...' : 'Додати новину'}
          </button>
          <button
            type="button"
            onClick={() => console.log({ ...formData, photos })}
            style={{ background: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
          >
            Перевірити
          </button>
        </div>
      </form>
    </div>
  );
}
