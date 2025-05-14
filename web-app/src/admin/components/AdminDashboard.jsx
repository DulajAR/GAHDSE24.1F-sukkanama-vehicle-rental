import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin"); // Clear the admin flag
    navigate("/admin/login"); // Redirect to login page
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
        <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h4>📊 Overview</h4>
          <p>Quick stats about users, suppliers, and reports.</p>
        </div>

        <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h4>🧑‍💼 Manage Users</h4>
          <p>Add, update or remove admin users.</p>
        </div>

        <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h4>📦 Manage Suppliers</h4>
          <p>View and control supplier accounts.</p>
        </div>

        <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h4>⚙️ Settings</h4>
          <p>Update admin settings or preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
