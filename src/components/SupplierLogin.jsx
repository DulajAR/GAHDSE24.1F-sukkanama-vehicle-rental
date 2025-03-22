import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const SupplierLogin = () => {
  const [formData, setFormData] = useState({ u_name: "", p_word: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simulating authentication (replace with backend API)
    if (formData.u_name === "supplier" && formData.p_word === "password") {
      alert("Login Successful!");
      window.location.href = "/supplier-dashboard";
    } else {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="container">
      <h2>Supplier Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="u_name" value={formData.u_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="p_word" value={formData.p_word} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered?{" "}
        <Link to="/signup-supplier">Register here</Link> {/* Using Link for navigation */}
      </p>
    </div>
  );
};

export default SupplierLogin;