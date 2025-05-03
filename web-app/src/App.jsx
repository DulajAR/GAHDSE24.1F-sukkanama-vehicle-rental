import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import SupplierLoginPage from "./pages/SupplierLoginPage";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import SupplierSignupPage from "./pages/SupplierSignupPage";
import CustomerLoginPage from "./pages/CustomerLoginPage";
import CustomerSignupPage from "./pages/CustomerSignupPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import VehicleRegisterPage from "./pages/VehicleRegisterPage";
import VehicleAddUpdatePage from "./pages/VehicleAddUpdatePage";

const App = () => {
  return (
    <div>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/supplier-login" element={<SupplierLoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup-supplier" element={<SupplierSignupPage />} />
        <Route path="loginCustomer" element={<CustomerLoginPage />} />
        <Route path="signup-customer" element={<CustomerSignupPage />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboardPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboardPage />} />
        <Route path="/register-vehicle" element={<VehicleRegisterPage />} />
        <Route path="/update-vehicle/:id" element={<VehicleAddUpdatePage />} />


      </Routes>
    </div>
  );
};

export default App;