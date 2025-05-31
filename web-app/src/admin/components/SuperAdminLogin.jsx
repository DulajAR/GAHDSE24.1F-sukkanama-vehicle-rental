import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const q = query(collection(db, "admins"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        const userData = adminDoc.data();

        if (userData.user_type === "super_admin") {
          localStorage.setItem("superAdminToken", uid);
          navigate("/superadmin/dashboard");
        } else {
          setError("Not authorized as super admin.");
        }
      } else {
        setError("Admin record not found.");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  return (
    <>
      <style>{`
        .super-admin-login-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }

        .super-admin-login-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .super-admin-login-form input,
        .super-admin-login-form button {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #bbb;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .super-admin-login-form button {
          background-color: #007bff;
          color: white;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }

        .super-admin-login-form button:hover {
          background-color: #0056b3;
        }

        .super-admin-login-form .error {
          color: red;
          margin-bottom: 10px;
          text-align: center;
        }
      `}</style>

      <form onSubmit={handleLogin} className="super-admin-login-form">
        <h2>Super Admin Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default SuperAdminLogin;
