import React, { useState }  from 'react';
import { useAddPersonalityMutation  } from '../../../src/redux/personalities/personalitiesApiSlice';

import { useNavigate } from "react-router-dom";

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


const AddPersonality = () => {
const [imageFile, setImageFile] = useState(null);


  const [formData, setFormData] = useState({
    fullname: "",
    fullname_en: "",
    scy_rank: "",
    scy_rank_en: "",
    scy_degree: "",
    scy_degree_en: "",
    scy_position: "",
    scy_position_en: "",
    links: "",
    cv: "",
    contact_place: "",
    contact_email: "",
    general_info: "",
    general_info_en: "",
    scientific_activity: "",
    scientific_activity_en: "",
    teaching_work: "",
    teaching_work_en: "",
  });

  const [addPersonality, { isLoading }] = useAddPersonalityMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const submissionData = {
  //     ...formData,
  //     links: formData.links.split(",").map((link) => link.trim()),
  //   };
  //   try {
  //     await addPersonality(submissionData).unwrap();
  //     navigate("/admin/personalities"); // Або ваша сторінка зі списком
  //   } catch (err) {
  //     console.error("Помилка при додаванні:", err);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();

  for (const [key, value] of Object.entries(formData)) {
    if (key === 'links') {
      formDataToSend.append(key, JSON.stringify(value.split(',').map(link => link.trim()).filter(Boolean)));
    } else {
      formDataToSend.append(key, value);
    }
  }

  if (imageFile) {
    formDataToSend.append('photo', imageFile);
  }

  try {
    await addPersonality(formDataToSend).unwrap();
    navigate("/admin/personalities");
  } catch (err) {
    console.error("Помилка при додаванні:", err);
  }
};

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Додати нову персоналію
      </h2>
  
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label>ПІБ</label>
            <input name="fullname" placeholder="ПІБ" value={formData.fullname} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Fullname (EN)</label>
            <input name="fullname_en" placeholder="Fullname (EN)" value={formData.fullname_en} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Наукове звання</label>
            <input name="scy_rank" placeholder="Наукове звання" value={formData.scy_rank} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Scientific Rank (EN)</label>
            <input name="scy_rank_en" placeholder="Scientific Rank (EN)" value={formData.scy_rank_en} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Науковий ступінь</label>
            <input name="scy_degree" placeholder="Науковий ступінь" value={formData.scy_degree} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Scientific Degree (EN)</label>
            <input name="scy_degree_en" placeholder="Scientific Degree (EN)" value={formData.scy_degree_en} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Посада</label>
            <input name="scy_position" placeholder="Посада" value={formData.scy_position} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Position (EN)</label>
            <input name="scy_position_en" placeholder="Position (EN)" value={formData.scy_position_en} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Посилання (через кому)</label>
            <input name="links" placeholder="Посилання (через кому)" value={formData.links} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Посилання на CV</label>
            <input name="cv" placeholder="Посилання на CV" value={formData.cv} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Місце перебування</label>
            <input name="contact_place" placeholder="Місце перебування" value={formData.contact_place} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label>Email (службовий)</label>
            <input name="contact_email" placeholder="Email" value={formData.contact_email} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
  
        <div>
          <label>Загальна інформація</label>
          <textarea name="general_info" placeholder="Загальна інформація" value={formData.general_info} onChange={handleChange} style={textareaStyle} />
        </div>
        <div>
          <label>General Info (EN)</label>
          <textarea name="general_info_en" placeholder="General Info (EN)" value={formData.general_info_en} onChange={handleChange} style={textareaStyle} />
        </div>
        <div>
          <label>Наукова діяльність</label>
          <textarea name="scientific_activity" placeholder="Наукова діяльність" value={formData.scientific_activity} onChange={handleChange} style={textareaStyle} />
        </div>
        <div>
          <label>Scientific Activity (EN)</label>
          <textarea name="scientific_activity_en" placeholder="Scientific Activity (EN)" value={formData.scientific_activity_en} onChange={handleChange} style={textareaStyle} />
        </div>
        <div>
          <label>Викладацька робота</label>
          <textarea name="teaching_work" placeholder="Викладацька робота" value={formData.teaching_work} onChange={handleChange} style={textareaStyle} />
        </div>
        <div>
          <label>Teaching Work (EN)</label>
          <textarea name="teaching_work_en" placeholder="Teaching Work (EN)" value={formData.teaching_work_en} onChange={handleChange} style={textareaStyle} />
        </div>

        <div>
  <label>Фото (jpg/png)</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])}
    style={inputStyle}
  />
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
            {isLoading ? 'Додається...' : 'Додати персоналію'}
          </button>
  
          <button
            type="button"
            onClick={() => console.log(formData)}
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

export default AddPersonality;
