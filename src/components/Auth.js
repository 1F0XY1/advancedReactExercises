import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email,
        password,
      });
      setMessage(`Registered successfully! Token: ${response.data.token}`);
    } catch (error) {
      setMessage('Registration failed. Please check your details.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      setMessage(`Logged in successfully! Token: ${response.data.token}`);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage('Login failed. Please check your details.');
    }
  };

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setMessage('Logged out successfully!');
    setIsLoggedIn(false);
  };

  return (
    <div className="container mt-5">
      <h2>Register, Login, Logout</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-3">
        {!isLoggedIn ? (
          <>
            <button className="btn btn-primary me-2" onClick={handleRegister}>
              Register
            </button>
            <button className="btn btn-success" onClick={handleLogin}>
              Login
            </button>
          </>
        ) : (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      {message && <p className="mt-3 alert alert-info">{message}</p>}
    </div>
  );
};

export default Auth;
