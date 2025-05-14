import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
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
      <AdminHeader />
      <div
        className="admin-signup-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingTop: "80px", // Space for fixed header
          backgroundColor: "#eef1f5", // Optional background for better contrast
        }}
      >
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <AdminSignupForm />
        </div>
      </div>
    </>
  );
};

export default AdminSignupFormPage;
