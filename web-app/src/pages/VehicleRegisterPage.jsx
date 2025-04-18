// src/pages/VehicleRegister.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VehicleRegistrationForm from '../components/VehicleRegistrationForm';

export default function VehicleRegisterPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", justifyContent: "center", padding: "1rem" }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <VehicleRegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}