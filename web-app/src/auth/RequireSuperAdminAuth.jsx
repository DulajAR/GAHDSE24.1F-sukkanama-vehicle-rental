// src/auth/RequireSuperAdminAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RequireSuperAdminAuth = ({ children }) => {
  const token = localStorage.getItem("superAdminToken");
  return token ? children : <Navigate to="/superadmin/login" />;
};

export default RequireSuperAdminAuth;
