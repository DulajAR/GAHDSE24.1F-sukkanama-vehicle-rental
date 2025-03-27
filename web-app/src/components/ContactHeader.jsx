import React from "react";

import banner from "../assets/banner.png";  // Import the image

const ContactHeader = () => {
  return (
    <section
      id="page-header"
      className="about-header"
      style={{ backgroundImage: `url(${banner})` }} // Dynamically set the background image
    >
      <h2>#Let's_talk</h2>
      <p>LEAVE A MESSAGE, We love to hear from you!</p>
    </section>
  );
};

export default ContactHeader;

