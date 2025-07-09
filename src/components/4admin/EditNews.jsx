import React, { useState, useEffect } from 'react';
import { useUpdateNewsMutation } from '../../../src/redux/news/newsApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearEditingNews } from '../../../src/redux/news/newsSlice';

const EditNews = () => {
  const editingNews = useSelector((state) => state.news.editingNews);
  const [updateNews, { isLoading }] = useUpdateNewsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    short_description: "",
    short_description_en: "",
    longer_description: "",
    longer_description_en: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // для існуючих фото

  useEffect(() => {
    if (editingNews) {
      setFormData({
        short_description: editingNews.short_description || "",
        short_description_en: editingNews.short_description_en || "",
        longer_description: editingNews.longer_description || "",
        longer_description_en: editingNews.longer_description_en || "",
      });

      // Якщо фото є
      if (editingNews.photos && Array.isArray(editingNews.photos)) {
        setExistingImages(editingNews.photos);
      }
    }
  }, [editingNews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedForm = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      updatedForm.append(key, value);
    }

    imageFiles.forEach((file) => updatedForm.append("photos", file));

    try {
      await updateNews({ id: editingNews.id, data: updatedForm }).unwrap();
      dispatch(clearEditingNews());
      navigate("/admin/news");
    } catch (err) {
      console.error("Помилка при оновленні новини:", err);
    }
  };

  if (!editingNews) return <p>Немає новини для редагування.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Редагування новини</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label>Короткий опис</label>
          <input
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            placeholder="Короткий опис"
          />
        </div>

        <div>
          <label>Short description (EN)</label>
          <input
            name="short_description_en"
            value={formData.short_description_en}
            onChange={handleChange}
            placeholder="Short description (EN)"
          />
        </div>

        <div>
          <label>Повний опис</label>
          <textarea
            name="longer_description"
            value={formData.longer_description}
            onChange={handleChange}
            placeholder="Повний опис"
          />
        </div>

        <div>
          <label>Full description (EN)</label>
          <textarea
            name="longer_description_en"
            value={formData.longer_description_en}
            onChange={handleChange}
            placeholder="Full description (EN)"
          />
        </div>

        <div>
          <label>Нові фото</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        </div>

        {/* Існуючі фото */}
        {existingImages.length > 0 && (
          <div>
            <p><strong>Поточні фото:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {existingImages.map((url, idx) => (
                <img key={idx} src={url} alt={`Фото ${idx + 1}`} style={{ width: '100px', borderRadius: 6 }} />
              ))}
            </div>
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Оновлюється..." : "Оновити новину"}
        </button>
      </form>
    </div>
  );
};

export default EditNews;
