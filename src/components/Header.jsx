import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get the current URL path

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header id="header">
      <img src={logo} className="logo" alt="Sukkanama Logo" />
      <nav>
        <ul id="navbar" className={isMobileMenuOpen ? "active" : ""}>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
          <Link to="/supplier-login" className={location.pathname === "/supplier-login" ? "active" : ""}>
  Rent Your Vehicle
</Link>

          </li>
          <li>
            <Link
              to="/loginCustomer"
              className={location.pathname === "/loginCustomer" ? "active" : ""}
            >
              Find Your Vehicle
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div id="mobile">
        <Link to="/cart">
          <i className="fas fa-shopping-bag"></i>
        </Link>
        <i id="bar" className="fas fa-bars" onClick={toggleMobileMenu}></i>
      </div>
    </header>
  );
};

export default Header;