import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    <section id="header">
      <img src={logo} className="logo" alt="Sukkanama Logo" />
      <nav>
        <ul id="navbar">
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/loginSupplier">Rent Your Vehicle</Link></li>
          <li><Link to="/loginCustomer">Find Your Vehicle</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div id="mobile">
        <Link to="/cart"><i className="fas fa-shopping-bag"></i></Link>
        <i id="bar" className="fas fa-outdent"></i>
      </div>
    </section>
  );
};

export default Header;
