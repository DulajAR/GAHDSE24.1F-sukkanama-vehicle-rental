import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation

const CustomerLogin = () => {
  const [formData, setFormData] = useState({ u_name: "", p_word: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new request

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/customer-dashboard"; // Redirect to dashboard
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Customer Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="u_name"
            value={formData.u_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="p_word"
            value={formData.p_word}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>
        Not registered? <Link to="/signup-customer">Register here</Link>
      </p>
    </div>
  );
};

export default CustomerLogin;
