// src/components/Deposit.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Deposit = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0.00);
  const [depositAmount, setDepositAmount] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setCurrentUserEmail(email);
      getCurrentBalance(email);
    }
  }, []);

  const getCurrentBalance = (email) => {
    console.log("token value is " + localStorage.getItem('token'))
    axios.get('https://vbb2.onrender.com/api/users/get_balance', { params: { email },headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}} )
      .then(response => setCurrentBalance(response.data.balance))
      .catch(error => console.log(error));
  };
 
  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount)) {
      alert('Please enter a valid number for the deposit amount.');
      return;
    }
    if (amount < 0) {
      alert('Please enter a positive deposit amount.');
      return;
    }
    console.log("token value is " + localStorage.getItem('token'))
    axios.post('https://vbb2.onrender.com/api/users/deposit', { email: currentUserEmail, amount: amount},{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then(() => {
        setCurrentBalance(prevBalance => prevBalance + amount);
        setShowSuccessMessage(true);
        setDepositAmount('');
      })
      .catch(error => {
        console.log(error);
        alert('Error processing deposit.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Deposit Funds</h5>
          <div className="mb-3 text-center">
            <p className="card-text">Current Balance: ${currentBalance.toFixed(2)}</p>
          </div>
          <form id="depositForm" onSubmit={handleDeposit}>
            <div className="mb-3">
              <label htmlFor="depositInput" className="form-label">Deposit Amount</label>
              <input
                type="text"
                className="form-control"
                id="depositInput"
                placeholder="Enter deposit amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" id="depositButton" disabled={!depositAmount.trim()}>Deposit</button>
            </div>
          </form>
          <div className="alert alert-success mt-3" id="successMessage" style={{ display: showSuccessMessage ? 'block' : 'none' }}>
            Deposit successful!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
