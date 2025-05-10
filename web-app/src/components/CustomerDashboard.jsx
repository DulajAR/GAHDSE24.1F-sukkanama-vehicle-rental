import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

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
            return { ...bookingData, vehicle: vehicleData };
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

  if (loading) return <p>Loading...</p>;
  if (!customer) return <p>No customer data found.</p>;

  return (
    <div className="customer-dashboard" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Customer Dashboard</h1>
      <h2>Welcome, {customer.f_name} {customer.l_name}</h2>

      <div className="customer-details" style={{ marginBottom: "20px" }}>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>NIC:</strong> {customer.nic}</p>
        <p><strong>Driving License:</strong> {customer.d_licen}</p>
        <p><strong>Phone:</strong> {customer.tel_no}</p>
        <p><strong>Registered on:</strong> {customer.reg_date}</p>
      </div>

      <button
        onClick={() => window.location.href = "/all-vehicles"}
        style={{ marginBottom: "30px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        View All Vehicles
      </button>

      <h3>My Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <div
            key={index}
            className="booking-card"
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h4>Booking #{index + 1}</h4>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Start Date:</strong> {booking.startDate}</p>
            <p><strong>End Date:</strong> {booking.endDate}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>

            {booking.vehicle ? (
              <div className="vehicle-details" style={{ marginTop: "15px" }}>
                <h5>Vehicle Details</h5>
                <img
                  src={booking.vehicle.vehicleImageUrl}
                  alt="Vehicle"
                  width="200"
                  style={{ marginBottom: "10px", borderRadius: "8px" }}
                />
                <p><strong>Brand:</strong> {booking.vehicle.brand}</p>
                <p><strong>Model:</strong> {booking.vehicle.model}</p>
                <p><strong>Plate:</strong> {booking.vehicle.plate}</p>
                <p><strong>Seats:</strong> {booking.vehicle.seat_capacity}</p>
                <p><strong>Fuel Type:</strong> {booking.vehicle.f_type}</p>
                <p><strong>Transmission:</strong> {booking.vehicle.t_mission}</p>
                <p><strong>Charge/Day:</strong> Rs. {booking.vehicle.per_day_chrg}</p>
              </div>
            ) : (
              <p>Vehicle details not available.</p>
            )}
            <hr style={{ marginTop: "20px", borderTop: "2px solid #ccc" }} />
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerDashboard;