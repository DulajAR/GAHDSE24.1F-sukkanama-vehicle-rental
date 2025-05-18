import React from "react";
import Header from "../components/Header";
import RateSupplier from "../components/RateSupplier";

const RateSupplierPage = () => {
  const supplierId = "526HeJrTI3O7kV9NdwQa"; // Example supplier
  const customerId = "5E2jyh94JqPDLHdnFIw0"; // Logged-in customer

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px", // Adjust this to match your fixed header height
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Rate Supplier</h1>
        <RateSupplier supplierId={supplierId} customerId={customerId} />
      </div>
    </>
  );
};

export default RateSupplierPage;
