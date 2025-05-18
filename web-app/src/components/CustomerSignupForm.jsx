import React, { useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const CustomerSignupForm = () => {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    nic: "",
    reg_date: "",
    p_word: "",
    tel_no: "",
    d_licen: "",
  });

  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState(""); // For empty fields or general errors
  const [passwordError, setPasswordError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  // Check if all fields are filled (non-empty after trimming spaces)
  const allFieldsFilled = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "p_word") {
      setPasswordError(
        value.length < 6 ? "Password must be at least 6 characters" : ""
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors/messages
    setFormError("");
    setMessage("");

    if (!allFieldsFilled()) {
      setFormError("❌ Please fill in all fields.");
      return;
    }

    if (formData.p_word.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.p_word
      );
      const user = userCredential.user;

      // Save customer data to Firestore using the same UID as document ID
      await setDoc(doc(db, "customers", user.uid), {
        f_name: formData.f_name,
        l_name: formData.l_name,
        email: formData.email,
        nic: formData.nic,
        reg_date: formData.reg_date,
        tel_no: formData.tel_no,
        d_licen: formData.d_licen,
        user_type: "customer",
      });

      setMessage("✅ Sign up successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/loginCustomer";
      }, 2000);
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage("❌ Error! Please try again.");
    }
  };

  const styles = {
    container: {
      maxWidth: "480px",
      margin: "50px auto",
      background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
      borderRadius: "20px",
      padding: "40px 30px",
      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)",
      color: "#222",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#0d3b66",
      marginBottom: "30px",
      textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
    },
    formGroup: {
      marginBottom: "22px",
      textAlign: "left",
    },
    input: {
      width: "100%",
      height: "42px",
      padding: "12px 15px",
      fontSize: "16px",
      borderRadius: "12px",
      border: "1.5px solid #0d3b66",
      outline: "none",
      boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
      transition: "border-color 0.3s ease",
      marginBottom: "8px",
      boxSizing: "border-box",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
    },
    errorText: {
      color: "red",
      marginBottom: "20px",
      fontWeight: "600",
      fontSize: "16px",
      textAlign: "left",
    },
    message: {
      marginBottom: "20px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#0d3b66",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#0d3b66",
      color: "white",
      fontSize: "18px",
      fontWeight: "700",
      border: "none",
      borderRadius: "15px",
      cursor: passwordError ? "not-allowed" : "pointer",
      boxShadow: "0 8px 15px rgba(13, 59, 102, 0.4)",
      transition: "all 0.3s ease",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#062841",
      boxShadow: "0 10px 20px rgba(6, 40, 65, 0.6)",
    },
    loginText: {
      marginTop: "25px",
      fontSize: "15px",
      color: "#0d3b66",
    },
    link: {
      color: "#07407c",
      fontWeight: "700",
      textDecoration: "none",
    },
    linkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Signup</h2>

      {/* Show form error */}
      {formError && <p style={styles.errorText}>{formError}</p>}

      {/* Show general message */}
      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <input
          style={styles.input}
          type="text"
          name="f_name"
          placeholder="First Name"
          value={formData.f_name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="l_name"
          placeholder="Last Name"
          value={formData.l_name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="nic"
          placeholder="NIC"
          value={formData.nic}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="date"
          name="reg_date"
          value={formData.reg_date}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="p_word"
          placeholder="Password"
          value={formData.p_word}
          onChange={handleChange}
          required
        />
        {passwordError && <p style={styles.errorText}>{passwordError}</p>}
        <input
          style={styles.input}
          type="tel"
          name="tel_no"
          placeholder="Phone Number"
          value={formData.tel_no}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="d_licen"
          placeholder="Driving License"
          value={formData.d_licen}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={!!passwordError}
          style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Sign Up
        </button>
      </form>

      <div style={styles.loginText}>
        <p>
          Already have an account?{" "}
          <Link
            to="/loginCustomer"
            style={linkHover ? { ...styles.link, ...styles.linkHover } : styles.link}
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerSignupForm;
