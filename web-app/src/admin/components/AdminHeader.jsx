import React from "react";
import logo from "../../assets/logo.png"; // ✅ Correct relative path

const AdminHeader = () => {
  return (
    <header id="header">
      <div className="admin-header-left" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} className="logo" alt="Sukkanama Logo" style={{ height: "50px", marginRight: "10px" }} />
        <h1 style={{ fontSize: "1.5rem", color: "#333" }}>
          Sukkanama Admin Dashboard
        </h1>
      </div>
      <nav>
        <ul id="navbar">
          <li>
            <a href="#">Supplier</a>
          </li>
          <li>
            <a href="#">Customer</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
