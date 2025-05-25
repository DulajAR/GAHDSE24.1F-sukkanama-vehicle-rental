import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin") === "true";
    if (isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <style>{`
        .admin-login-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100vw;
          padding: 20px;
          background-color: #eef1f5;
          box-sizing: border-box;
        }

        .admin-login-page h1 {
          width: 100%;
          max-width: 400px;
          text-align: center;
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }

        .admin-login-container {
          width: 100%;
          max-width: 400px;
          display: flex;
          justify-content: center;
        }
      `}</style>

      <div className="admin-login-page">
        <h1>Wellcome to Sukkanama Admin Dashboard Login</h1>
        <div className="admin-login-container">
          <AdminLogin />
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
