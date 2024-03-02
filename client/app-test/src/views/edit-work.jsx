import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import { useNavigate, useParams } from 'react-router-dom';

export const EditWorkForm = () => {
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
      const { data } = await axios.get(BaseUrl + `work/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      setFormData(data.dataWork)
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
      const { data } = await axios.put(BaseUrl + `work/${id}`, formData,
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
    console.log(data, "<<< ini data")
    navigate(`/detail-biodata/${data.biodataId}`)
  };

  return (
    <div className="container mt-5">
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Nama Perusahaan:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastPosition">Posisi Terakhir:</label>
          <input type="text" className="form-control" id="lastPosition" name="lastPosition" value={formData.lastPosition} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastSalary">Pendapatan Terakhir:</label>
          <input type="text" className="form-control" id="lastSalary" name="lastSalary" value={formData.lastSalary} onChange={handleChange} required />
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
