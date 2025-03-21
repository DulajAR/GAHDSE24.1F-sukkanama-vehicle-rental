import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router for navigation


const SupplierSignupForm = () => {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    nic: "",
    u_name: "",
    p_word: "",
    tel_no: "",
    tax_id: "",
    user_type: "supplier",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate the signup process for now
    setMessage("✅ Sign up successful! Redirecting...");
    setTimeout(() => (window.location.href = "/dashboard"), 2000);
  };

  return (
    <div className="signup-container">
      <h2>Supplier Signup</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="f_name"
          placeholder="First Name"
          value={formData.f_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="l_name"
          placeholder="Last Name"
          value={formData.l_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          value={formData.nic}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="u_name"
          placeholder="Username"
          value={formData.u_name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="p_word"
          placeholder="Password"
          value={formData.p_word}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tel_no"
          placeholder="Telephone Number"
          value={formData.tel_no}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tax_id"
          placeholder="Tax ID"
          value={formData.tax_id}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <div className="login-link">
        <p>
          Already have an account? <Link to="/supplier-login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SupplierSignupForm;