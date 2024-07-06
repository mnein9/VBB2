// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import AllData from './components/AllData';
import Login from './components/Login';

const Navbar = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    history.push('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#004571' }}>
      <a className="navbar-brand" href="/">Very Bad Bank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/">Home</Link>
          <Link className="nav-item nav-link" to="/create-account">Create Account</Link>
          <Link className="nav-item nav-link" to="/deposit">Deposit</Link>
          <Link className="nav-item nav-link" to="/withdraw">Withdraw</Link>
          <Link className="nav-item nav-link" to="/all-data">All Data</Link>
          {!isLoggedIn && <Link className="nav-item nav-link" to="/login">Login</Link>}
        </div>
        <div className="navbar-nav ml-auto">
          {isLoggedIn && (
            <>
              <span className="navbar-text mr-3">{userEmail}</span>
              <button className="btn btn-link nav-item nav-link" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/all-data" component={AllData} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
