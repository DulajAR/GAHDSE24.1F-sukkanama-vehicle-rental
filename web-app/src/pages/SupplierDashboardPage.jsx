import React from "react";
import Header from "../components/Header";
import SupplierDashboard from "../components/SupplierDashboard";
import Footer from "../components/Footer";

const SupplierDashboardPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px",  // Adjust this to match your Header height
          minHeight: "100vh",
          backgroundColor: "#eef1f5",  // Optional, consistent styling
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <SupplierDashboard />
        <Footer />
      </div>
    </>
  );
};

export default SupplierDashboardPage;
