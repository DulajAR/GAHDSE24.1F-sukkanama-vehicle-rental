import React from "react";
import CustomerDashboard from "../components/CustomerDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomerDashboardPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px",  // Same height as your Header
          minHeight: "100vh",
          backgroundColor: "#eef1f5",  // Optional styling
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CustomerDashboard />
        <Footer />
      </div>
    </>
  );
};

export default CustomerDashboardPage;
