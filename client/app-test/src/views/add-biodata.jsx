import axios from 'axios';
import React, { useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import { useNavigate } from 'react-router-dom';

export const AddDataForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    position: '',
    name: '',
    idCardNumber: '',
    birth: '',
    gender: '',
    religion: '',
    status: '',
    addressCard: '',
    address: '',
    email: '',
    noHP: '',
    guardian: '',
    skill: '',
    relocate: '',
    salary: '',
  });
  const token = localStorage.getItem('access_token');


  const create = async () => {
    console.log(formData)
    try {
      const { data } = await axios.post(BaseUrl + 'biodata', formData,
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
    const data = await create()
    if(!data){
      return 
    }

    // Reset form setelah submit
    setFormData({
      position: '',
      name: '',
      idCardNumber: '',
      birth: '',
      gender: '',
      religion: '',
      status: '',
      addressCard: '',
      address: '',
      email: '',
      noHP: '',
      guardian: '',
      skill: '',
      relocate: '',
      salary: '',
    });
    navigate('/')
  };

  return (
    <div className="container mt-5">
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input type="text" className="form-control" id="position" name="position" value={formData.position} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="idCardNumber">ID Card Number:</label>
          <input type="text" className="form-control" id="idCardNumber" name="idCardNumber" value={formData.idCardNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="birth">Birth:</label>
          <input type="text" className="form-control" id="birth" name="birth" value={formData.birth} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="L">Male</option>
            <option value="P">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="religion">Religion:</label>
          <input type="text" className="form-control" id="religion" name="religion" value={formData.religion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input type="text" className="form-control" id="status" name="status" value={formData.status} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="addressCard">Address Card:</label>
          <input type="text" className="form-control" id="addressCard" name="addressCard" value={formData.addressCard} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="noHP">Phone Number:</label>
          <input type="text" className="form-control" id="noHP" name="noHP" value={formData.noHP} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="guardian">Guardian:</label>
          <input type="text" className="form-control" id="guardian" name="guardian" value={formData.guardian} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="skill">Skill:</label>
          <input type="text" className="form-control" id="skill" name="skill" value={formData.skill} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="relocate">Relocate:</label>
          <select className="form-control" id="relocate" name="relocate" value={formData.relocate} onChange={handleChange} required>
            <option value="">Select Option</option>
            <option value="Y">Yes</option>
            <option value="T">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input type="number" className="form-control" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
