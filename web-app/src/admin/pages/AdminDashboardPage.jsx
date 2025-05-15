import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminDashboard from "../components/AdminDashboard";
import AdminDetails from "../components/AdminDetails"; // ✅ Import it

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin") !== null;
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <>
      <AdminHeader />
      <div
        className="admin-dashboard-page"
        style={{
          minHeight: "100vh",
          paddingTop: "80px", // space for fixed header
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <AdminDashboard />

          <div style={{ marginTop: "40px" }}>
            <h3 style={{ marginBottom: "20px", color: "#555" }}>Admin Details</h3>
            <AdminDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
