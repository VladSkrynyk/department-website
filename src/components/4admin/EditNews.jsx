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

  return (<div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
  <h2 className="text-2xl font-bold mb-6">Редагування новини</h2>

  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <div>
      <label className="block font-medium">Короткий опис</label>
      <input
        className="w-full border border-gray-300 p-2 rounded"
        name="short_description"
        value={formData.short_description}
        onChange={handleChange}
        placeholder="Короткий опис"
      />
    </div>

    <div>
      <label className="block font-medium">Short description (EN)</label>
      <input
        className="w-full border border-gray-300 p-2 rounded"
        name="short_description_en"
        value={formData.short_description_en}
        onChange={handleChange}
        placeholder="Short description (EN)"
      />
    </div>

    <div>
      <label className="block font-medium">Повний опис</label>
      <textarea
        className="w-full border border-gray-300 p-2 rounded"
        name="longer_description"
        value={formData.longer_description}
        onChange={handleChange}
        placeholder="Повний опис"
        rows={4}
      />
    </div>

    <div>
      <label className="block font-medium">Full description (EN)</label>
      <textarea
        className="w-full border border-gray-300 p-2 rounded"
        name="longer_description_en"
        value={formData.longer_description_en}
        onChange={handleChange}
        placeholder="Full description (EN)"
        rows={4}
      />
    </div>

    <div>
      <label className="block font-medium">Нові фото</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>

    {existingImages.length > 0 && (
      <div>
        <p className="font-semibold">Поточні фото:</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {existingImages.map((url, idx) => (
            <img key={idx} src={url} alt={`Фото ${idx + 1}`} className="w-24 h-24 object-cover rounded shadow" />
          ))}
        </div>
      </div>
    )}

    <button
      type="submit"
      disabled={isLoading}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? "Оновлюється..." : "Оновити новину"}
    </button>
  </form>
</div>)

};

export default EditNews;
