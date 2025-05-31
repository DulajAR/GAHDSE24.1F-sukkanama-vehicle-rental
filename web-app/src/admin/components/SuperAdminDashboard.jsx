// src/admin/components/SuperAdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("superAdminToken");
    navigate("/superadmin/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1> Welcome to the Super Admin Dashboard</h1>
      <p>You are logged in as Super Admin.</p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#c0392b",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default SuperAdminDashboard;
