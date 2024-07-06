// src/components/Login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (email.trim() === '') {
      alert('Email field is required.');
      return false;
    }
    if (password.trim() === '') {
      alert('Password field is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { email, password } = formData;
      axios.post('http://localhost:5001/api/users/login', { email, password })
        .then((response) => {
          // Assuming the response contains the token
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userEmail', email);
          setShowSuccessModal(true);
          setFormData({ email: '', password: '' });
          history.push('/');
        })
        .catch((error) => {
          console.error(error);
          alert('Error logging in.');
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Log In</h5>
          <form id="loginAccountForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Log In</button>
            </div>
          </form>
          {showSuccessModal && (
            <div className="alert alert-success mt-3">
              Logged in successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
