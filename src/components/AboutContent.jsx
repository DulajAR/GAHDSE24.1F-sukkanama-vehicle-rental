import React from "react";
import aboutImage from "../assets/a6.jpg"; // Import the image
import videoFile from "../assets/1.mp4";

const AboutContent = () => {
  return (
    <div>
      {/* Page Header Section */}
      <section id="page-header" className="about-header">
        <h2>#KnownUs</h2>
        <p>Quality Craftsmanship!</p>
      </section>

      {/* About Us Section */}
      <section id="about-head" className="section-p1">
        <img src={aboutImage} alt="About Sukkanama" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            The idea of starting Sukkanama Vehicles arises with a vision of
            providing travelers with their desired rental vehicles. For many
            traditional car rentals, vehicles offered are usually overpriced or,
            in some cases, unregulated. Sukkanama aims to provide a platform
            where its members can easily access better and unique vehicles at
            more affordable prices. No more guessing whether your next vehicle
            is what you saw online!
          </p>
          <abbr title="">
            Sukkanama is also where you can rent out your vehicles when not
            used. A simple streamlined listing process makes earning passively
            from your vehicles easier than you could imagine! List your vehicles
            with us and let your vehicles work for you!
          </abbr>
          <br />
          <br />
          {/* Marquee section */}
          <marquee
            bgcolor="#ccc"
            loop="-1"
            scrollAmount="5"
            width="100%"
            className="about-marquee"
          >
            At Sukkanama, we take immense pride in introducing our innovative
            vehicle renting system, built on a foundation of excellence. Our
            unwavering commitment to providing exceptional service sets us apart
            in the industry. We extend a warm invitation to you to join us and
            discover the remarkable difference our new system makes in your
            travel journey.
          </marquee>
        </div>
      </section>

      {/* Download App Section */}
      <section id="about-app" className="section-p1">
        <h1>Download Our <a href="#">App</a></h1>
        <div className="video">
        <video autoPlay muted loop src={videoFile}></video>

        </div>
      </section>
    </div>
  );
};

export default AboutContent;