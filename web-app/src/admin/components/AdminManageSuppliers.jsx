// src/components/AdminManageSuppliers.jsx
import React from "react";

const AdminManageSuppliers = ({ suppliers, onDelete }) => {
  return (
    <div className="admin-supplier-container">
      <h2>All Registered Suppliers</h2>
      <table className="admin-supplier-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.f_name}</td>
              <td>{supplier.l_name}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phone}</td>
              <td>
                <button onClick={() => onDelete(supplier.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .admin-supplier-container {
          padding: 30px;
          background: #ffffff;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          font-family: 'Segoe UI', sans-serif;
        }

        .admin-supplier-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-supplier-table th, .admin-supplier-table td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: center;
        }

        .admin-supplier-table th {
          background-color: #111111;
          color: #fff;
        }

        .admin-supplier-table button {
          background-color: #ff4d4d;
          border: none;
          padding: 6px 12px;
          color: white;
          cursor: pointer;
          border-radius: 5px;
        }

        .admin-supplier-table button:hover {
          background-color: #e60000;
        }
      `}</style>
    </div>
  );
};

export default AdminManageSuppliers;