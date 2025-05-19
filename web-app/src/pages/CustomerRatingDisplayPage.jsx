import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import CustomerRatingDisplay from "../components/CustomerRatingDisplay";

const CustomerRatingDisplayPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customerId");

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px",
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Customer Ratings</h1>
        <CustomerRatingDisplay customerId={customerId} />
      </div>
    </>
  );
};

export default CustomerRatingDisplayPage;
