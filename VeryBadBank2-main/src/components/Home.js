// src/components/Home.js
import React from 'react';
import bankImage from '../assets/badbank2.png';

const Home = () => {
  return (
    <div className="card my-5">
      <img src={bankImage} className="card-img-top" alt="Bank" />
      <div className="card-body">
        <h5 className="card-title text-center font-weight-bold">Welcome to Very Bad Bank</h5>
        <p className="card-text text-center">
        At Very Bad Bank, we excel at making your money matters our top priority. Don’t be fooled by our name; our services are first-class! Join us for a banking experience that's surprisingly exceptional—so good, it feels almost illegal. Enjoy seamless deposits and effortless withdrawals, all while we turn the notion of 'bad' into a symbol of excellence. We provide financial solutions that are as reliable as they are innovative, transforming your financial woes into wins. Trust us to handle your finances with unparalleled expertise, ensuring your banking experience is not just good, but extraordinary. 💵
        </p>
      </div>
    </div>
  );
};

export default Home;
