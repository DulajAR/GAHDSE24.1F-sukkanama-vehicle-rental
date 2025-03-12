import React from 'react';
import { useNavigate } from 'react-router-dom';
import b2 from '../assets/b2.jpg'; // Adjust the path based on your folder structure

const Banner = () => {
  const navigate = useNavigate();

  const exploreMore = () => {
    navigate('/loginCustomer');
  };

  return (
    <section
      id="banner"
      className="section-m1"
      style={{
        backgroundImage: `url(${b2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '125%',
        height: '40vh',
      }}
    >
      <h4>Trusted Services</h4>
      <h2>Search your vehciles here!</h2>
      <button className="normal" onClick={exploreMore}>Explore More</button>
    </section>
  );
};

export default Banner;