import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validCredentials = {
    "eve.holt@reqres.in": "cityslicka",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validCredentials[email] !== password) {
      setMessage('Login failed: Invalid email or password.');
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      setMessage(`Login successful! Token: ${response.data.token}`);
      console.log('Login response:', response.data);
    } catch (error) {
      setMessage('Login failed: Invalid email or password.');
      console.error('Login error:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              {message && (
                <div className="mt-3 alert alert-info text-center" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
