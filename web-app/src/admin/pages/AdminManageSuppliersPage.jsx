import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminManageSuppliers from "../components/AdminManageSuppliers";

const AdminManageSuppliersPage = () => {
  return (
    <>
      <AdminHeader />
      <div
        style={{
          paddingTop: "80px", // same height as AdminHeader so content isn't hidden
          minHeight: "100vh",
          backgroundColor: "#eef1f5", // optional background for page
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <AdminManageSuppliers />
      </div>
    </>
  );
};

export default AdminManageSuppliersPage;
