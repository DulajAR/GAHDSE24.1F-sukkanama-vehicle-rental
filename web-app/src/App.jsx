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
import AllVehiclesPage from "./pages/AllVehiclesPage";
import BookNowPage from './pages/BookNowPage';
import UpdateBookingPage from "./pages/UpdateBookingPage";
import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminSignupFormPage from "./admin/pages/AdminSignupFormPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminManageCustomersPage from "./admin/pages/AdminManageCustomersPage";
import AdminCustomerDetailUpdatePage from "./admin/pages/AdminCustomerDetailUpdatePage";


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
        <Route path="/all-vehicles" element={<AllVehiclesPage />} />
        <Route path="/book/:vehicleId" element={<BookNowPage />} />
        <Route path="/update-booking/:bookingId" element={<UpdateBookingPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin-signup" element={<AdminSignupFormPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/manage-customers" element={<AdminManageCustomersPage />} />
        <Route path="/admin/customers/edit/:id" element={<AdminCustomerDetailUpdatePage />} />

       


      </Routes>
    </div>
  );
};

export default App;