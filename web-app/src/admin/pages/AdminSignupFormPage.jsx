import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSignupForm from "../components/AdminSignupForm";

const AdminSignupFormPage = () => {
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
        .admin-signup-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100vw;
          background-color: #eef1f5;
          padding: 20px;
          box-sizing: border-box;
        }

        .admin-signup-container {
          max-width: 500px;
          width: 100%;
        }
      `}</style>

      <div className="admin-signup-page">
        <div className="admin-signup-container">
          <AdminSignupForm />
        </div>
      </div>
    </>
  );
};

export default AdminSignupFormPage;
