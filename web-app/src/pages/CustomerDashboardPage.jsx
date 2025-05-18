import React from "react";
import CustomerDashboard from "../components/CustomerDashboard";
import CustomerBookings from "../components/CustomerBookings";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomerDashboardPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px", // Adjust according to header height
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px", // space between components
        }}
      >
        <CustomerDashboard />
        <CustomerBookings />
        <Footer />
      </div>
    </>
  );
};

export default CustomerDashboardPage;
