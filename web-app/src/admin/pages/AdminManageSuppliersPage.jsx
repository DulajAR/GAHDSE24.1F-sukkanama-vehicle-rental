// src/pages/AdminManageSuppliersPage.jsx
import React, { useEffect, useState } from "react";
import AdminManageSuppliers from "../components/AdminManageSuppliers";

const AdminManageSuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch supplier data from backend
    fetch("/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  const handleDelete = (id) => {
    // Delete supplier logic
    fetch(`/api/suppliers/${id}`, { method: "DELETE" })
      .then(() => {
        setSuppliers((prev) => prev.filter((s) => s.id !== id));
      })
      .catch((err) => console.error("Error deleting supplier:", err));
  };

  return (
    <div style={{ margin: "40px" }}>
      <h1>Admin Panel - Manage Suppliers</h1>
      <AdminManageSuppliers suppliers={suppliers} onDelete={handleDelete} />
    </div>
  );
};

export default AdminManageSuppliersPage;
