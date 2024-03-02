import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../helpers/baseurl';

export const Home = () => {

  const [biodata, setBiodata] = useState([]);
  const token = localStorage.getItem('access_token');


  const fetch = async () => {
    try {
      const {data} = await axios.get(BaseUrl + 'biodata', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setBiodata(data.dataBiodata)
      console.log(data.dataBiodata)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const navigate = useNavigate();

  function handleEntryData() {
    navigate('/add-biodata')
  }

  const handleSeeDetail = (id) => {
    navigate(`/detail-biodata/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      
      await axios.delete(BaseUrl + `biodata/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetch()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container mt-5">
      <h2>Home</h2>
      <button className="btn btn-primary" onClick={handleEntryData}>Entry Data</button>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tempat Tanggal Lahir</th>
            <th>Posisi Dilamar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {biodata.map((el) => {
            return (
              <tr>
            <td>{el.name}</td>
            <td>{el.birth}</td>
            <td>{el.position}</td>
            <td>
              <a className="btn btn-info btn-sm"  onClick={() => handleSeeDetail(el.id)}>See Detail</a>
              <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(el.id)}>Delete</button>
            </td>
          </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
};

