// src/components/AllData.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const AllData = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {

    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:5001/api/users/profile', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        //.then(response => response.json())
        .then(data => {setUser(data.data); console.log("data is: " + JSON.stringify(data));})
        .catch(error => console.error('Failed to retrieve user submissions:', error));
  };

  useEffect(() => {

    console.log("Changed user: ", user)

  }, [user])

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">All Data</h5>
          <div className="mb-3 text-center">
            <p className="card-text">User Submissions:</p>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                    <tr key="keyvalue">
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td>{user.balance}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllData;
