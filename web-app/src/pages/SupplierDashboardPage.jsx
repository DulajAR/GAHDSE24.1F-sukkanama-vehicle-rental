import React from "react";
import Header from "../components/Header";
import SupplierDashboard from "../components/SupplierDashboard";
import Footer from "../components/Footer";
import SupplierVehicleBookingFilter from "../components/SupplierVehicleBookingFilter";

const SupplierDashboardPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px", // Adjust to match header height
          minHeight: "100vh", // Only one minHeight here
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // minHeight removed from here (duplicate)
        }}
      >
        
        <SupplierDashboard />
        <SupplierVehicleBookingFilter />
        <Footer />
      </div>
    </>
  );
};

export default SupplierDashboardPage;
