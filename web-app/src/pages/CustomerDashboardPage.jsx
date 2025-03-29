import React from "react";
import CustomerDashboard from "../components/CustomerDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomerDashboardPage = () => {
  return (
    <div>
         <Header />
      <CustomerDashboard />
      <Footer />
    </div>
  );
};

export default CustomerDashboardPage;