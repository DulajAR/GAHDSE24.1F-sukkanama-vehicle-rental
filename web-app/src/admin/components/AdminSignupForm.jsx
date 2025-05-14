import { useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

const AdminSignupForm = () => {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    nic: "",
    reg_date: "",
    p_word: "",
    tel_no: "",
    user_type: "admin",
  });

  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "p_word") {
      setPasswordError(value.length < 6 ? "Password must be at least 6 characters" : "");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.p_word.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.p_word);
      const user = userCredential.user;

      await addDoc(collection(db, "admins"), {
        f_name: formData.f_name,
        l_name: formData.l_name,
        email: formData.email,
        nic: formData.nic,
        reg_date: formData.reg_date,
        tel_no: formData.tel_no,
        user_type: "admin",
      });

      setMessage("✅ Admin sign up successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 2000);
    } catch (e) {
      console.error("Error adding admin: ", e);
      setMessage("❌ Error! Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Admin Signup</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="f_name" placeholder="First Name" value={formData.f_name} onChange={handleChange} required />
        <input type="text" name="l_name" placeholder="Last Name" value={formData.l_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} required />
        <input type="date" name="reg_date" value={formData.reg_date} onChange={handleChange} required />
        
        <input
          type="password"
          name="p_word"
          placeholder="Password"
          value={formData.p_word}
          onChange={handleChange}
          required
        />
        {passwordError && <p className="error-text">{passwordError}</p>}
        
        <input type="text" name="tel_no" placeholder="Telephone Number" value={formData.tel_no} onChange={handleChange} required />

        <button type="submit" disabled={passwordError}>Sign Up</button>
      </form>

      <div className="login-link">
        <p>
          Already have an account? <Link to="/admin/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignupForm;
