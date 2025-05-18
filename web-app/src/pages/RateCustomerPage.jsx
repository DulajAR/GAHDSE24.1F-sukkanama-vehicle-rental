import React from "react";
import Header from "../components/Header";
import RateCustomer from "../components/RateCustomer";

const RateCustomerPage = () => {
  const customerId = "5E2jyh94JqPDLHdnFIw0"; // Example customer
  const supplierId = "526HeJrTI3O7kV9NdwQa"; // Logged-in supplier

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px", // Match the height of your fixed header
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Rate Customer</h1>
        <RateCustomer customerId={customerId} supplierId={supplierId} />
      </div>
    </>
  );
};

export default RateCustomerPage;
