import React from 'react';

const Newsletter = () => {
  return (
    <section id="newsletter" className="section-p1 section-m1">
      <div className="newstext">
      <h2>Subscribe to Newsletter</h2>
        <p>Sign up to get the latest updates</p>
      </div>
      <div className="form">
        <input type="text" placeholder="Email address" />
        <button className="normal">Sign Up</button>
      </div>
    </section>
  );
};

export default Newsletter;