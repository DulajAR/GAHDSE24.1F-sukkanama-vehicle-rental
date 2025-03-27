import React from "react";
import CustomerLogin from "../components/CustomerLogin";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";

const CustomerLoginPage = () => {
  return (
    <div>
      <Header />
      <CustomerLogin />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default CustomerLoginPage;
