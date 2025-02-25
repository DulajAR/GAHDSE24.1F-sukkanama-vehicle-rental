import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBackground from '../assets/hero4.png'; // Adjust the path based on your folder structure

const Hero = () => {
  const navigate = useNavigate();

  const browseVehicles = () => {
    navigate('/loginCustomer');
  };

  return (
    <section id="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
      <h4>Services</h4>
      <h2>Super value vehicles</h2>
      <h1>Sukkanama</h1>
      <p>Save time, connect with us!</p>
      <button onClick={browseVehicles}>Browse Now</button>
    </section>
  );
};

export default Hero;