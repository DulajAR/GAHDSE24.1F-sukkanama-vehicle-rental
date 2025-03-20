import React from "react";

const ContactInfo = () => {
  return (
    <section id="contact-details" className="section-p1">
      <div className="details">
        <span>GET IN TOUCH</span>
        <h2>Explore our Sukkanama website today and discover premium service.</h2>
        <h3>Contact Us</h3>
        <ul>
          <li>
            <i className="far fa-map"></i>
            <p>562 Kithulampitiya Road, Street 31, Galle, Sri Lanka</p>
          </li>
          <li>
            <i className="far fa-envelope"></i>
            <p>sukkanama@gmail.com</p>
          </li>
          <li>
            <i className="fas fa-phone-alt"></i>
            <p>+94 077 987 8765</p>
          </li>
          <li>
            <i className="far fa-clock"></i>
            <p>We're here for you 24/7</p>
          </li>
        </ul>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.7065318345794!2d80.21541757576566!3d6.034951493950654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb01710e51%3A0xad97c91a28f03c9a!2sHemara%20Rich%20Look!5e0!3m2!1sen!2slk!4v1709479387028!5m2!1sen!2slk"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactInfo;
