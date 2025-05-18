import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async (userEmail) => {
      try {
        const q = query(collection(db, "customers"), where("email", "==", userEmail));
        const customerSnap = await getDocs(q);
        if (!customerSnap.empty) {
          setCustomer(customerSnap.docs[0].data());
        }

        const bq = query(collection(db, "bookings"), where("customerEmail", "==", userEmail));
        const bookingSnap = await getDocs(bq);

        const bookingsWithVehicles = await Promise.all(
          bookingSnap.docs.map(async (docSnap) => {
            const bookingData = docSnap.data();
            const vehicleRef = doc(db, "vehicles", bookingData.vehicleId);
            const vehicleSnap = await getDoc(vehicleRef);
            const vehicleData = vehicleSnap.exists() ? vehicleSnap.data() : null;
            return { ...bookingData, vehicle: vehicleData, id: docSnap.id };
          })
        );

        setBookings(bookingsWithVehicles);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCustomerData(user.email);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
      alert("Booking deleted successfully.");
    } catch (error) {
      console.error("Failed to delete booking:", error);
      alert("Error deleting booking.");
    }
  };

  if (loading) return <p style={{ padding: "30px", fontSize: "18px" }}>Loading...</p>;
  if (!customer) return <p style={{ padding: "30px", fontSize: "18px" }}>No customer data found.</p>;

  return (
    <div
      className="customer-dashboard"
      style={{
        padding: "50px",
        fontFamily: "Segoe UI, sans-serif",
        background: "#f1f4f9",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "#333", fontSize: "32px", marginBottom: "10px" }}>Customer Dashboard</h1>
        <h2 style={{ color: "#555", fontSize: "24px", marginBottom: "25px" }}>
          Welcome, {customer.f_name} {customer.l_name}
        </h2>

        <div style={{ marginBottom: "30px", fontSize: "18px", lineHeight: "1.6" }}>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>NIC:</strong> {customer.nic}</p>
          <p><strong>Driving License:</strong> {customer.d_licen}</p>
          <p><strong>Phone:</strong> {customer.tel_no}</p>
          <p><strong>Registered on:</strong> {customer.reg_date}</p>
        </div>

        <button
          onClick={() => window.location.href = "/all-vehicles"}
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "40px",
          }}
        >
          View All Vehicles
        </button>

        <h3 style={{ fontSize: "22px", marginBottom: "25px", color: "#333" }}>My Bookings</h3>

        {bookings.length === 0 ? (
          <p style={{ fontSize: "18px" }}>No bookings found.</p>
        ) : (
          bookings.map((booking, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f9fafc",
                border: "1px solid #ddd",
                padding: "25px",
                borderRadius: "12px",
                marginBottom: "35px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "17px",
              }}
            >
              <h4 style={{ marginBottom: "12px", fontSize: "20px" }}>Booking #{index + 1}</h4>
              <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <strong>Booking ID:</strong> {booking.id}
  <button
    onClick={() => {
      navigator.clipboard.writeText(booking.id);
      alert("Booking ID copied to clipboard!");
    }}
    style={{
      padding: "6px 12px",
      fontSize: "14px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Copy
  </button>
</p>

              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Start Date:</strong> {booking.startDate}</p>
              <p><strong>End Date:</strong> {booking.endDate}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              
              

              {booking.vehicle ? (
                <div style={{ marginTop: "20px" }}>
                  <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>Vehicle Details</h5>
                  <img
                    src={booking.vehicle.vehicleImageUrl}
                    alt="Vehicle"
                    width="350"
                    height="200"
                    style={{
                      marginBottom: "15px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <p><strong>Brand:</strong> {booking.vehicle.brand}</p>
                  <p><strong>Model:</strong> {booking.vehicle.model}</p>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", margin: "10px 0" }}>
  <strong>Plate:</strong>
  <span>{booking.vehicle.plate}</span>
  <button
    onClick={() => {
      navigator.clipboard.writeText(booking.vehicle.plate);
      alert("Plate number copied to clipboard!");
    }}
    style={{
      padding: "6px 12px",
      fontSize: "14px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Copy
  </button>
</div>

                  <p><strong>Seats:</strong> {booking.vehicle.seat_capacity}</p>
                  <p><strong>Fuel Type:</strong> {booking.vehicle.f_type}</p>
                  <p><strong>Transmission:</strong> {booking.vehicle.t_mission}</p>
                  <p><strong>Charge/Day:</strong> Rs. {booking.vehicle.per_day_chrg}</p>
                </div>
              ) : (
                <p style={{ marginTop: "10px" }}>Vehicle details not available.</p>
              )}

              <div style={{ marginTop: "20px" }}>
                <Link
                  to={`/update-booking/${booking.id}`}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "6px",
                    marginRight: "12px",
                    display: "inline-block",
                    fontSize: "16px",
                  }}
                >
                  Update Booking
                </Link>

                <button
                  onClick={() => handleDelete(booking.id)}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Delete Booking
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
