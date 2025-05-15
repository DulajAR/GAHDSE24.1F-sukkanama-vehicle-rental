import React from "react";
import AdminHeader from "../components/AdminHeader"; 
import AdminManageCustomers from "../components/AdminManageCustomers";
import AdminCustomerBookings from "../components/AdminCustomerBookings";  // Import new component

const AdminManageCustomersPage = () => {
  return (
    <>
      <AdminHeader />
      <div
        style={{
          paddingTop: "80px", // same as header height
          minHeight: "100vh",
          backgroundColor: "#eef1f5", // optional, for consistent styling
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <AdminManageCustomers />
        {/* Added AdminCustomerBookings component here */}
        <div style={{ marginTop: "40px" }}>
          <AdminCustomerBookings />
        </div>
      </div>
    </>
  );
};

export default AdminManageCustomersPage;
