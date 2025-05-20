// src/pages/AdminViewAllRatingsPage.jsx
import React from 'react';
import AdminHeader from "../components/AdminHeader";
import AdminSupplierRatings from "../components/AdminSupplierRatings";
import AdminCustomerRatings from "../components/AdminCustomerRatings";

const AdminViewAllRatingsPage = () => {
  return (
    <>
      <AdminHeader />
      <div
        style={{
          paddingTop: "80px", // same as header height
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h1>Admin - All Ratings Overview</h1>
        <hr />
        <AdminSupplierRatings />
        <hr style={{ marginTop: "40px" }} />
        <AdminCustomerRatings />
      </div>
    </>
  );
};

export default AdminViewAllRatingsPage;
