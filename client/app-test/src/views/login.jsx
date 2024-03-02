import axios from 'axios';
import { useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const { data } = await axios.post(BaseUrl + 'login', { email, password });
      console.log(data)
      if(data != undefined){
      localStorage.setItem('access_token', data.access_token);
      }
    } catch ({ response }) {
      console.log(response.data.message)
    }
  };

  function handleEmail(e) {
    console.log(e.target.value);
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    console.log(e.target.value);

    setPassword(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await login();
    navigate('/home');
  }

  return (
    <section className="bg-img">
      <div className="container  vh-100 w-75 d-flex align-items-center justify-content-center">
        <div className="w-50 h-auto bg-dark p-3 rounded text-white shadow-lg">
          <h4 className="text-center fw-bold text-warning">WELCOME</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example3" name="email">
                Email
              </label>
              <input type="text" id="form3Example3" className="form-control" name="email" onChange={handleEmail} />
              <label className="form-label" htmlFor="form3Example4" name="password">
                Password
              </label>
              <input type="password" id="form3Example4" className="form-control" name="password" onChange={handlePassword} />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning btn-block mb-4">
                Login
              </button>
            </div>
            <div className="text-center my-4">
              <h7>
                Don&apos;t have an account? <Link to="/register">Register here</Link>
              </h7>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
