import React from 'react';
import { useNavigate } from 'react-router-dom';
import b17 from '../assets/b17.png'; // Adjust the path based on your folder structure
import b10 from '../assets/b10.jpg';

const SmallBanner = () => {
  const navigate = useNavigate();

  return (
    <section id="sm-banner" className="section-p1">
      <div
        className="banner-box banner-box2"
        style={{ //backgroundImage: `url(${b10})`
        backgroundSize: '300px,200px', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}
      ><div>
        <h4>Hosts</h4>
        <h5>Sign up and start earning from your vehicles</h5>
        <button className="white" onClick={() => navigate('/loginCustomer')}>Register Now</button>
        </div>
      </div>
      <div
        className="banner-box"
        style={{ //backgroundImage: `url(${b17})`
         backgroundSize: '300px,200px', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}
      >
        <div>
        <h4>Hirers</h4>
        <h5>Register and be a member and you can start choosing from hundredrs of vehicles and find your perfect match</h5>
        <button className="white" onClick={() => navigate('/loginSupplier')}>Register Now</button>
      </div>
      </div>
    </section>
  );
};

export default SmallBanner;