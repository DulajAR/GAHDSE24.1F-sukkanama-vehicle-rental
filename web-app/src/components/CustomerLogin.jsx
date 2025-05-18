import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config"; // Import Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({ email: "", p_word: "" });
  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in customer with Firebase Authentication using email
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.p_word);
      const user = userCredential.user;

      alert("Login Successful!");
      window.location.href = "/customer-dashboard"; // Redirect to customer dashboard
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    }
  };

  const styles = {
    container: {
      maxWidth: '480px',
      margin: '50px auto',
      background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
      borderRadius: '20px',
      padding: '40px 30px',
      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
      color: '#222',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: 'center',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#0d3b66',
      marginBottom: '30px',
      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
    },
    formGroup: {
      marginBottom: '22px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',  // label above input
      width: '100%',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#0d3b66',
      fontSize: '16px',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      fontSize: '16px',
      borderRadius: '12px',
      border: '1.5px solid #0d3b66',
      outline: 'none',
      boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',  // ensures padding & border inside width
    },
    error: {
      color: 'red',
      marginBottom: '20px',
      fontWeight: '600',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#0d3b66',
      color: 'white',
      fontSize: '18px',
      fontWeight: '700',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      boxShadow: '0 8px 15px rgba(13, 59, 102, 0.4)',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#062841',
      boxShadow: '0 10px 20px rgba(6, 40, 65, 0.6)',
    },
    registerText: {
      marginTop: '25px',
      fontSize: '15px',
      color: '#0d3b66',
    },
    link: {
      color: '#07407c',
      fontWeight: '700',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Login</h2>
      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="p_word">Password:</label>
          <input
            style={styles.input}
            type="password"
            id="p_word"
            name="p_word"
            value={formData.p_word}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Login
        </button>
      </form>

      <p style={styles.registerText}>
        Not registered?{" "}
        <Link
          to="/signup-customer"
          style={linkHover ? { ...styles.link, ...styles.linkHover } : styles.link}
          onMouseEnter={() => setLinkHover(true)}
          onMouseLeave={() => setLinkHover(false)}
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default CustomerLogin;
