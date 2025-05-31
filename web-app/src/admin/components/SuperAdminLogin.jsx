import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config"; // adjust path as needed
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);
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
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "white",
          padding: "2rem 3rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2>Super Admin Login</h2>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.8rem",
            margin: "0.6rem 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.8rem",
            margin: "0.6rem 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginTop: "1rem",
            backgroundColor: hover ? "#0056b3" : "#007bff",
            color: "white",
            border: "none",
            fontSize: "1.1rem",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SuperAdminLogin;
