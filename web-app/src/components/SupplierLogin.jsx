import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config"; // Import Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";


const SupplierLogin = () => {
  const [formData, setFormData] = useState({ email: "", p_word: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in user with Firebase Authentication using email
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.p_word);
      const user = userCredential.user;

      alert("Login Successful!");
      window.location.href = "/supplier-dashboard"; // Redirect to dashboard
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="container">
      <h2>Supplier Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
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
            className="input-field"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered? <Link to="/signup-supplier">Register here</Link>
      </p>
    </div>
  );
};

export default SupplierLogin;
