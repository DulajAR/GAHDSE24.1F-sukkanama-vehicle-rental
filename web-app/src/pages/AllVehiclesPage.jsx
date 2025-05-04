// src/pages/AllVehiclesPage.jsx
import React from "react";
import AllVehicles from "../components/AllVehicles";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AllVehiclesPage = () => {
  return (
    <>
      <Header />
      <div className="all-vehicles-page">
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>All Your Vehicles</h1>
        <AllVehicles />
      </div>
      <Footer />
    </>
  );
};

export default AllVehiclesPage;