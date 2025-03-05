import React from 'react';
import { useNavigate } from 'react-router-dom';
import b17 from '../assets/b17.png'; // Adjust the path based on your folder structure
import b10 from '../assets/b10.jpg';

const SmallBanner = () => {
  const navigate = useNavigate();

  return (
    <section id="sm-banner" className="section-p1">
      <div
        className="banner-box"
        style={{ backgroundImage: `url(${b17})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h4>Rent Vehicle Owners</h4>
        <h2>Publish Your Add</h2>
        <span>Find Customers in Easy Steps</span>
        <button className="white" onClick={() => navigate('/loginSupplier')}>Sign Up</button>
      </div>
      <div
        className="banner-box banner-box2"
        style={{ backgroundImage: `url(${b10})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h4>Vehicle Finders for Rent</h4>
        <h2>Select & Book Your Vehicle</h2>
        <span>Find Your vehicle in Easy Steps</span>
        <button className="white" onClick={() => navigate('/loginCustomer')}>Sign Up</button>
      </div>
    </section>
  );
};

export default SmallBanner;