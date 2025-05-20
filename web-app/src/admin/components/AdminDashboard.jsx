import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const cardStyle = {
    padding: "20px",
    background: "#f5f5f5",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#333" }}>Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
    <div
  style={cardStyle}
  onClick={() => navigateTo("/admin/ratings")}
  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  <h4>⭐️ Ratings</h4>
  <p>Manage and review customer feedback and service ratings.</p>
</div>


        <div
          style={cardStyle}
          onClick={() => navigateTo("/admin/manage-customers")}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4>🧑‍💼 Manage Customers</h4>
          <p>View and control customer accounts, vehicle bookings.</p>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigateTo("/admin/manage-suppliers")}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4>📦 Manage Suppliers</h4>
          <p>View and control supplier accounts, vehicle adds.</p>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigateTo("/admin/settings")}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h4>⚙ Settings</h4>
          <p>Update admin settings or preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;