import React from "react";
import img1 from "../assets/1.png"; // Adjust the path based on your folder structure
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";

const ContactFormSection = () => {
  return (
    <section id="form-details">
      <form action="">
        <span>LEAVE A MESSAGE</span>
        <h2>We would love to hear from you</h2>
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="E-Mail" />
        <input type="text" placeholder="Subject" />
        <textarea cols="30" rows="10" placeholder="Your Message"></textarea>
        <button className="normal">Submit</button>
      </form>

      <div className="people">
        <div>
          <img src={img1} alt="Kamal Perera" />
          <p>
            <span>Kamal Perera</span> Senior Marketing Manager <br />
            Phone: +94 776545432 <br />
            Email: contact@gmail.com
          </p>
        </div>

        <div>
          <img src={img2} alt="Standra Alwis" />
          <p>
            <span>Standra Alwis</span> Managing Director <br />
            Phone: +94 716599832 <br />
            Email: stan@gmail.com
          </p>
        </div>

        <div>
          <img src={img3} alt="Stafanie Fernando" />
          <p>
            <span>Stafanie Fernando</span> Senior Marketing Supervisor <br />
            Phone: +94 776544321 <br />
            Email: hallo@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;