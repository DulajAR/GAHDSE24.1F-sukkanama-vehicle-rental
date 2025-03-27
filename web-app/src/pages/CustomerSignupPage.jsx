import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomerSignupForm from "../components/CustomerSignupForm";

const CustomerSignupPage = () => {
  return (
    <div>
      <Header />
      <CustomerSignupForm />
      <Footer />
    </div>
  );
};

export default CustomerSignupPage;