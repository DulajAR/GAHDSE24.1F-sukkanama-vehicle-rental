import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import AdminHeader from "../components/AdminHeader";

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
      <AdminHeader />
      <div
        className="admin-login-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingTop: "80px", // make space for header
          backgroundColor: "#eef1f5", // optional: better contrast
        }}
      >
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <AdminLogin />
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
