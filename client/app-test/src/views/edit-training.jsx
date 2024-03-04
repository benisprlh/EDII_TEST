import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import { useNavigate, useParams } from 'react-router-dom';

export const EditTrainingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const [formData, setFormData] = useState({
    name: '',
    certificate: '',
    period: '',
  });
  const token = localStorage.getItem('access_token');

  const fetch = async () => {
    try {
      const { data } = await axios.get(BaseUrl + `training/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      setFormData(data.dataTraining)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])


  const update = async () => {
    console.log(formData)
    try {
      const { data } = await axios.put(BaseUrl + `training/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      return data
    } catch ({ response }) {
      console.log(response.data.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formData);
    const data = await update()
    if(!data){
      return 
    }
    navigate(`/detail-biodata/${data.biodataId}`)
  };

  return (
    <div className="container mt-5">
      <h2>Edit Data</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Nama Kursus/Pelatihan:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="certificate">Sertifikat (Ada/Tidak):</label>
          <input type="text" className="form-control" id="certificate" name="certificate" value={formData.certificate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="period">Tahun:</label>
          <input type="text" className="form-control" id="period" name="period" value={formData.period} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
