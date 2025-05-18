import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SupplierRatingDisplay from "../components/SupplierRatingDisplay";

const SupplierRatingDisplayPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const supplierId = searchParams.get("supplierId");

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "80px", // Adjust to match fixed header height
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Supplier Ratings</h1>
        <SupplierRatingDisplay supplierId={supplierId} />
      </div>
    </>
  );
};

export default SupplierRatingDisplayPage;
