import React from 'react';
import f1 from '../assets/f1.png'; // Adjust the path based on your folder structure
import f2 from '../assets/f2.png';
import f3 from '../assets/f3.png';
import f4 from '../assets/f4.png';
import f5 from '../assets/f5.png';



const Feature = () => {
  return (
    <section id="feature" className="section-p1">
      <div className="fe-box">
        <img src={f1} alt="100% Trusted Service" />
        <h6>100% Trusted Service</h6>
      </div>
      <div className="fe-box">
        <img src={f2} alt="Easy Booking" />
        <h6>Easy Booking</h6>
      </div>
      <div className="fe-box">
        <img src={f3} alt="24/7 service" />
        <h6>24/7 service</h6>
      </div>
      <div className="fe-box">
        <img src={f4} alt="Virtual Vehicle Tours" />
        <h6>Virtual Vehicle Tours</h6>
      </div>
      <div className="fe-box">
        <img src={f5} alt="Booking Calendar" />
        <h6>Booking Calendar</h6>
      </div>
      
    </section>
  );
};

export default Feature;