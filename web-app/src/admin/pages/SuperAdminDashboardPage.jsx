import React from "react";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import SuperAdminNewAdminVerification from "../components/SuperAdminNewAdminVerification"; // ✅ Import added

const SuperAdminDashboardPage = () => {
  return (
    <>
      <SuperAdminDashboard />
      <SuperAdminNewAdminVerification /> {/* ✅ Render here */}
    </>
  );
};

export default SuperAdminDashboardPage;
