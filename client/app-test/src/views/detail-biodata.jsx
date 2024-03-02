import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import BaseUrl from "../helpers/baseurl";

export const DetailBiodata = () => {
  const [biodata, setBiodata] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const fetch = async () => {
    try {
      const { data } = await axios.get(BaseUrl + `biodata/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.dataBiodata)
      setBiodata(data.dataBiodata);
    } catch (error) {
      console.log(error);
    }
  };

  function handleEditBiodata() {
    navigate(`/edit-biodata/${id}`)
  }

  function handleAddEducation() {
    navigate(`/add-education/${id}`)
  }

  function handleAddTraining() {
    navigate(`/add-training/${id}`)
  }

  function handleAddWork() {
    navigate(`/add-work/${id}`)
  }

  async function handleDelete(item, id) {
        try {
            const {data} = await axios.delete(BaseUrl + item + `/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              console.log(data)
              fetch()
        } catch (error) {
            console.log(error)
        }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
            <h2 className="card-title m-0">DATA PRIBADI PELAMAR</h2>
            <button
              className="btn btn-primary"
              onClick={() => handleEditBiodata()}
            >
              <span className="oi oi-pencil mr-2" aria-hidden="true"></span>{" "}
              Edit
            </button>
          </div>
          <ul className="list-unstyled">
            <li>
              <strong>Nama:</strong> {biodata?.name}
            </li>
            <li>
              <strong>Posisi Yang Dilamar:</strong> {biodata?.position}
            </li>
            <li>
              <strong>No KTP:</strong> {biodata?.idCardNumber}
            </li>
            <li>
              <strong>Tempat, Tanggal Lahir:</strong> {biodata?.birth}
            </li>
            <li>
              <strong>Jeni Kelamin:</strong> {biodata?.gender === "L" ? "Laki-Laki" : "Perempuan"}
            </li>
            <li>
              <strong>Agama:</strong> {biodata?.religion}
            </li>
            <li>
              <strong>Status:</strong> {biodata?.status}
            </li>
            <li>
              <strong>Alamat KTP:</strong> {biodata?.addressCard}
            </li>
            <li>
              <strong>Alamat Tinggal:</strong> {biodata?.address}
            </li>
            <li>
              <strong>Email:</strong> {biodata?.email}
            </li>
            <li>
              <strong>Nomor Telepon:</strong> {biodata?.noHP}
            </li>
            <li>
              <strong>Orang Terdekat Yang Dapat Dihubungi:</strong> {biodata?.guardian}
            </li>
            <li>
              <strong>Skill:</strong> {biodata?.skill}
            </li>
            <li>
              <strong>Bersedia Di Tempatkan Di Seluruh Kantor Perusahaan:</strong> {biodata?.relocate === "Y" ? "Yes": "No"}
            </li>
            <li>
              <strong>Penghasilan Yang Di Harapkan:</strong> {biodata?.salary}
            </li>
          </ul>
          <div>
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="card-title m-0">Pendidikan Terakhir</h4>
            <button
              className="btn btn-primary"
              onClick={() => handleAddEducation()}
            >
              <span className="oi oi-pencil mr-2" aria-hidden="true"></span>{" "}
              Tambah
            </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jenjang Pendidikan Terakhir</th>
                  <th>Nama</th>
                  <th>Jurusan</th>
                  <th>Tahun Lulus</th>
                  <th>IPK</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {biodata?.Education?.map((el, index) => {
                    return (<tr>
                    <td>{index + 1}</td>
                    <td>{el.level}</td>
                    <td>{el.name}</td>
                    <td>{el.major}</td>
                    <td>{el.graduateDate.slice(0, 4)}</td>
                    <td>{el.ipk}</td>
                    <td>
                  <Link to={`/edit-education/${el.id}`} className="btn btn-primary mr-2">Edit</Link>
                  <button onClick={() => handleDelete('education', el.id)} className="btn btn-danger">Delete</button>
                </td>
                  </tr>)
                })}
              </tbody>
            </table>
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="card-title m-0">Riwayat Pelatihan</h4>
            <button
              className="btn btn-primary"
              onClick={() => handleAddTraining()}
            >
              <span className="oi oi-pencil mr-2" aria-hidden="true"></span>{" "}
              Tambah
            </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Kursus/Seminar</th>
                  <th>Sertifikat (Ada/Tidak)</th>
                  <th>Tahun</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {biodata?.Trainings?.map((el, index) => {
                    return (<tr>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.certificate}</td>
                    <td>{el.period.slice(0, 4)}</td>
                    <td>
                  <Link to={`/edit-training/${el.id}`} className="btn btn-primary mr-2">Edit</Link>
                  <button onClick={() => handleDelete('training', el.id)} className="btn btn-danger">Delete</button>
                </td>
                  </tr>)
                })}
              </tbody>
            </table>
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="card-title m-0">Riwayat Pekerjaan</h4>
            <button
              className="btn btn-primary"
              onClick={() => handleAddWork()}
            >
              <span className="oi oi-pencil mr-2" aria-hidden="true"></span>{" "}
              Tambah
            </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Perusahaan</th>
                  <th>Posisi Terakhir</th>
                  <th>Pendapatan Terakhir</th>
                  <th>Tahun</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {biodata?.Works?.map((el, index) => {
                    return (<tr>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.lastPosition}</td>
                    <td>{el.lastSalary}</td>
                    <td>{el.period.slice(0, 4)}</td>
                    <td>
                  <Link to={`/edit-work/${el.id}`} className="btn btn-primary mr-2">Edit</Link>
                  <button onClick={() => handleDelete('work', el.id)} className="btn btn-danger">Delete</button>
                </td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
