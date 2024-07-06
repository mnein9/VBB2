// src/components/CreateAccount.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

let userData = JSON.parse(localStorage.getItem("userData"))
let token
if (userData) {
  token = userData.token
}
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const CreateAccount = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAddAnother, setShowAddAnother] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    if (name.trim() === '') {
      alert('Name field is required.');
      return false;
    }
    if (email.trim() === '') {
      alert('Email field is required.');
      return false;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { name, email, password } = formData;
      axios.post('https://vbb2.onrender.com/api/users/create-account', { name, email, password })
        .then((response) => {
          setShowSuccessModal(true);
          setShowAddAnother(true);
          setFormData({ name: '', email: '', password: '' });
          let token;
          if (response.data) {
            token = response.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", response.data.email);
            console.log("Token is " + token);
          }
          console.log("localStorage is: " + JSON.stringify(localStorage));
        })
        .catch((error) => {
          console.error(error);
          alert('Error creating account.');
        });
    }
  };

  const handleAddAnother = () => {
    setShowAddAnother(false);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Create Account</h5>
          <form id="createAccountForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Create a password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Create Account</button>
            </div>
          </form>
          {showSuccessModal && (
            <div className="alert alert-success mt-3">
              Account created successfully!
            </div>
          )}
          {showAddAnother && (
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-secondary" onClick={handleAddAnother}>Add Another Account</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
