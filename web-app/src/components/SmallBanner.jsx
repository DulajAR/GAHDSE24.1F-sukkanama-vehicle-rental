import React from "react";
import { useNavigate } from "react-router-dom";
import b17 from "../assets/b17.png"; // Adjust the path based on your folder structure
import b10 from "../assets/b10.jpg";

const SmallBanner = () => {
  const navigate = useNavigate();

  return (
    <section id="sm-banner">
      <div
        className="banner-box"
        style={{
          backgroundImage: `url(${b10})`,
        }}
      >
        <div className="banner-content">
          <h4>Hosts</h4>
          <p>Sign up and start earning from your vehicles</p>
          <button onClick={() => navigate("/supplier-login")}>Register Now</button>
        </div>
      </div>

      <div
        className="banner-box"
        style={{
          backgroundImage: `url(${b17})`,
        }}
      >
        <div className="banner-content">
          <h4>Hirers</h4>
          <p>Register and start choosing from hundreds of vehicles to find your perfect match.</p>
          <button onClick={() => navigate("/loginCustomer")}>Register Now</button>
        </div>
      </div>
    </section>
  );
};

export default SmallBanner;
