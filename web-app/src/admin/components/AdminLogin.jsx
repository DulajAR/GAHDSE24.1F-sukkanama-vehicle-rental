import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const adminsRef = collection(db, "admins");
      const q = query(adminsRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        const adminData = adminDoc.data();

        if (adminData.status === "approved") {
          localStorage.setItem("admin", adminDoc.id);
          window.alert("✅ Login successful!");
          navigate("/admin/dashboard");
        } else {
          setError("Your account is pending approval by Super Admin.");
          window.alert("⏳ Login failed: Your account is pending approval by Super Admin.");
        }
      } else {
        // If admin doc not found, optionally create one (not required for approved-only logic)
        const adminDocRef = doc(db, "admins", user.email);
        await setDoc(adminDocRef, {
          email: user.email,
          f_name: "Admin",
          l_name: "User",
          nic: "N/A",
          tel_no: "N/A",
          reg_date: new Date().toISOString().split("T")[0],
          user_type: "admin",
          status: "pending", // Default to pending
        });
        setError("Your account is pending approval by Super Admin.");
        window.alert("⏳ Your account has been created but is pending approval by Super Admin.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password");
      window.alert("❌ Login failed: Invalid email or password");
    }
  };

  return (
    <>
      <style>{`
        .admin-login-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }

        .admin-login-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .admin-login-form input,
        .admin-login-form button {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #bbb;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
          display: block;
        }

        .admin-login-form button {
          background-color: #4CAF50;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }

        .admin-login-form button:hover {
          background-color: #45a049;
        }

        .admin-login-form .error {
          color: red;
          margin-bottom: 10px;
          text-align: center;
        }

        .register-link {
          text-align: center;
          margin-top: 15px;
          font-size: 14px;
        }

        .register-link a {
          color: #007bff;
          text-decoration: none;
        }

        .register-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="register-link">
          Not registered? <Link to="/admin-signup">Register here</Link>
        </p>
      </form>
    </>
  );
};

export default AdminLogin;
