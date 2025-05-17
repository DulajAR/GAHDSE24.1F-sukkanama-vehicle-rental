import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminManageSuppliers from "../components/AdminManageSuppliers";
import AdminSupplierVehicles from "../components/AdminSupplierVehicles"; // ✅ Import the new component

const AdminManageSuppliersPage = () => {
  return (
    <>
      <AdminHeader />
      <div
        style={{
          paddingTop: "80px",
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h2>Manage Suppliers</h2>
        <AdminManageSuppliers />

        <hr style={{ margin: "40px 0" }} />

        <h2>Supplier Vehicles</h2>
        <AdminSupplierVehicles /> {/* ✅ Display the vehicles component */}
      </div>
    </>
  );
};

export default AdminManageSuppliersPage;
