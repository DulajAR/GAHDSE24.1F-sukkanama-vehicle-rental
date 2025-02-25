// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <section id="header">
      <Link to="/"><img src="logo.png" className="logo" alt="Sukkanama Logo" /></Link>
      <div>
        <ul id="navbar">
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/loginSupplier">Rent Your Vehicle</Link></li>
          <li><Link to="/loginCustomer">Find Your Vehicle</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <a href="#" id="close"><i className="fa fa-window-close" aria-hidden="true"></i></a>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/cart"><i className="fas fa-shopping-bag"></i></Link>
        <i id="bar" className="fas fa-outdent"></i>
      </div>
    </section>
  );
};

export default Header;