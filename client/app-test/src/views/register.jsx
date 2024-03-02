import axios from 'axios';
import { useState } from 'react';
import BaseUrl from '../helpers/baseurl';
import { useNavigate } from 'react-router-dom';


export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const { data } = await axios.post(BaseUrl + 'register', { email, password });
      localStorage.setItem('access_token', data.access_token);
    } catch ({ response }) {
      console.log(response.error.message)
    }
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await login();
    navigate('/login');
  }

  function handleLogin(e) {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <section className="bg-img">
      <div className="container  vh-100 w-75  d-flex align-items-center justify-content-center">
        <div className="w-sm-100 w-50 h-auto bg-dark p-3 rounded text-white shadow-lg">
          <h4 className="text-center fw-bold text-warning">WELCOME</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example2" name="email">
                Email
              </label>
              <input type="email" id="form3Example2" className="form-control" name="email" onChange={handleEmail} />
              <label className="form-label" htmlFor="form3Example4" name="password">
                Password
              </label>
              <input type="password" id="form3Example4" className="form-control" name="password" onChange={handlePassword} />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-warning btn-block mb-4">
                Register
              </button>
            </div>
            <div className="text-center my-4">
              <h7>
                Have an account?{' '}
                <a href="" onClick={handleLogin}>
                  Login here
                </a>
              </h7>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
