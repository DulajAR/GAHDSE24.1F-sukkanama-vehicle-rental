import React from 'react';
import logo from '../assets/logo.png'; // Adjust the path based on your folder structure
import app from '../assets/app.jpg';
import play from '../assets/play.jpg';
import pay from '../assets/pay.png';


const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <h4>Contact</h4>
        <p><strong>Address: </strong>562 Kithulampitiya Road, Street 31, Galle, SriLanka</p>
        <p><strong>Phone: </strong>+94 78 856 8282 / +94 77 987 8765</p>
        
        <div className="follow">
          <h4>Follow us</h4>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="#">About us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src={app} alt="App Store" />
          <img src={play} alt="Google Play" />
        </div>
        <p>Secured Payment Gateways</p>
        <img src={pay} alt="Payment Methods" />
      </div>

      <div className="copyright">
        <p>© 2024, Sukkanama etc - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;