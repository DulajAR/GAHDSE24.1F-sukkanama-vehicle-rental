import React from 'react';
import f1 from '../assets/f1.png'; // Adjust the path based on your folder structure
import f2 from '../assets/f2.png';
import f3 from '../assets/f3.png';
import f4 from '../assets/f4.png';
import f5 from '../assets/f5.png';
import f6 from '../assets/f6.png';



const Feature = () => {
  return (
    <section id="feature" className="section-p1">
      <div className="fe-box">
        <img src={f1} alt="Free Service" />
        <h6>Free Service</h6>
      </div>
      <div className="fe-box">
        <img src={f2} alt="Online Book" />
        <h6>Online Book</h6>
      </div>
      <div className="fe-box">
        <img src={f3} alt="Save Money" />
        <h6>Save Money</h6>
      </div>
      <div className="fe-box">
        <img src={f4} alt="Promotions" />
        <h6>Promotions</h6>
      </div>
      <div className="fe-box">
        <img src={f5} alt="Happy Service" />
        <h6>Happy Service</h6>
      </div>
      <div className="fe-box">
        <img src={f6} alt="24/7 Support" />
        <h6>24/7 Support</h6>
      </div>
    </section>
  );
};

export default Feature;