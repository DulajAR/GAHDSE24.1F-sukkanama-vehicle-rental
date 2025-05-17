import React from "react";
import AdminHeader from "../components/AdminHeader"; // Adjust path as needed
import AdminSupplierVehicleUpdate from "../components/AdminSupplierVehicleUpdate"; // Adjust path as needed

const AdminSupplierVehicleUpdatePage = () => {
  return (
    <div>
      <AdminHeader />
      <div style={{ padding: "1rem" }}>
        <AdminSupplierVehicleUpdate />
      </div>
    </div>
  );
};

export default AdminSupplierVehicleUpdatePage;
