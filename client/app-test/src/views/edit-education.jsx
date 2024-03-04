import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import { useNavigate, useParams } from 'react-router-dom';

export const EditEducationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const [formData, setFormData] = useState({
    level: '',
    name: '',
    major: '',
    graduateDate: '',
    ipk: '',
  });
  const token = localStorage.getItem('access_token');

  const fetch = async () => {
    try {
      const { data } = await axios.get(BaseUrl + `education/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      setFormData(data.dataEducation)
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
      const { data } = await axios.put(BaseUrl + `education/${id}`, formData,
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
          <label htmlFor="level">Jenjang Pendidikan:</label>
          <input type="text" className="form-control" id="level" name="level" value={formData.level} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nama Institusi Akademik:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="major">Jurusan:</label>
          <input type="text" className="form-control" id="major" name="major" value={formData.major} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="graduateDate">Tahun Lulus:</label>
          <input type="text" className="form-control" id="graduateDate" name="graduateDate" value={formData.graduateDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="ipk">IPK:</label>
          <input type="text" className="form-control" id="ipk" name="ipk" value={formData.ipk} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
