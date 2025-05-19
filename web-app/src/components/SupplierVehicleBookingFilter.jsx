import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function SupplierDashboard() {
  const [bookings, setBookings] = useState([]);
  const [supplierId, setSupplierId] = useState(null);
  const [filters, setFilters] = useState({
    plateNo: "",
    vehicleId: "",
    bookingId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplierAndData = async (userEmail) => {
      const supplierQuery = query(
        collection(db, "suppliers"),
        where("email", "==", userEmail)
      );
      const supplierSnapshot = await getDocs(supplierQuery);
      if (supplierSnapshot.empty) {
        alert("Supplier not found.");
        navigate("/login");
        return;
      }
      const supplierDoc = supplierSnapshot.docs[0];
      const supplierId = supplierDoc.id;
      setSupplierId(supplierId);

      const vehicleQuery = query(
        collection(db, "vehicles"),
        where("userId", "==", supplierId)
      );
      const vehicleSnapshot = await getDocs(vehicleQuery);
      const vehiclesMap = {};
      vehicleSnapshot.forEach((doc) => {
        vehiclesMap[doc.id] = doc.data();
      });

      const bookingsSnapshot = await getDocs(collection(db, "bookings"));
      const filteredBookings = bookingsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((booking) => vehiclesMap.hasOwnProperty(booking.vehicleId));

      const customersSnapshot = await getDocs(collection(db, "customers"));
      const customersMap = {};
      customersSnapshot.forEach((doc) => {
        customersMap[doc.id] = doc.data();
      });

      const bookingList = filteredBookings.map((booking) => {
        const vehicle = vehiclesMap[booking.vehicleId] || {};
        const customer = customersMap[booking.customerId] || {};
        return {
          ...booking,
          vehiclePlate: vehicle.plate || "N/A",
          vehicleModel: vehicle.model || "Unknown Model",
          vehicleImage: vehicle.vehicleImageUrl || "https://via.placeholder.com/80",
          customerName: `${customer.f_name || ""} ${customer.l_name || ""}`.trim(),
          customerEmail: customer.email || "N/A",
          phone: customer.tel_no || "N/A",
        };
      });

      setBookings(bookingList);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSupplierAndData(user.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleBookingAction = (id, newStatus) => {
    const updated = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updated);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };

  // Safely filter bookings according to search filters:
  const filteredBookings = bookings.filter((booking) => {
    const plateMatch = (booking.vehiclePlate || "")
      .toLowerCase()
      .includes(filters.plateNo.toLowerCase());
    const vehicleIdMatch = (booking.vehicleId || "")
      .toLowerCase()
      .includes(filters.vehicleId.toLowerCase());
    const bookingIdMatch = (booking.id || "")
      .toLowerCase()
      .includes(filters.bookingId.toLowerCase());
    return plateMatch && vehicleIdMatch && bookingIdMatch;
  });

  return (
    <section className="booking-table-container">
      <h2>Your Vehicle Bookings</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Plate No"
          value={filters.plateNo}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, plateNo: e.target.value }))
          }
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Search by Vehicle ID"
          value={filters.vehicleId}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, vehicleId: e.target.value }))
          }
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Search by Booking ID"
          value={filters.bookingId}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, bookingId: e.target.value }))
          }
        />
      </div>

      {filteredBookings.length > 0 ? (
        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Plate No</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Start</th>
                <th>End</th>
                <th>Vehicle ID</th>
                <th>Booking ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <img
                      src={booking.vehicleImage}
                      alt={booking.vehicleModel}
                      style={{ width: "80px", borderRadius: "4px" }}
                    />
                    <br />
                    {booking.vehicleModel}
                  </td>
                  <td>{booking.vehiclePlate}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>
                    {booking.vehicleId}{" "}
                    <button
                      className="copy-btn"
                      onClick={() => navigator.clipboard.writeText(booking.vehicleId)}
                    >
                      📋
                    </button>
                  </td>
                  <td>
                    {booking.id}{" "}
                    <button
                      className="copy-btn"
                      onClick={() => navigator.clipboard.writeText(booking.id)}
                    >
                      📋
                    </button>
                  </td>
                  <td>{booking.status}</td>
                  <td>
                    <button
                      onClick={() => handleBookingAction(booking.id, "Accepted")}
                      style={{
                        color: "green",
                        marginRight: "5px",
                        background: "transparent",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleBookingAction(booking.id, "Rejected")}
                      style={{
                        color: "orange",
                        marginRight: "5px",
                        background: "transparent",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      style={{
                        color: "red",
                        background: "transparent",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                    <br />
                    <button
                      onClick={() => navigate(`/rate-customer/${booking.id}`)}
                      style={{
                        marginTop: "5px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Add Rating
                    </button>
                    <button
                      style={{
                        marginTop: "5px",
                        marginLeft: "5px",
                        backgroundColor: "#6c757d",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                      onClick={() => navigate(`/customer-ratings/${booking.id}`)}
                    >
                      View Rating
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No bookings found.</p>
      )}





 


      <style>{`
        .booking-table-container {
          max-width: 100%;
          margin: 50px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }
        .table-wrapper {
          overflow-y: auto;
          max-height: 500px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .booking-table {
          width: 100%;
          min-width: 900px;
          border-collapse: collapse;
        }
        .booking-table th, .booking-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
          white-space: nowrap;
        }
        .booking-table th {
          background-color: rgb(7, 0, 0);
          color: white;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .booking-table button:hover {
          text-decoration: underline;
        }
        .copy-btn {
          cursor: pointer;
          background: none;
          border: none;
          font-size: 16px;
          margin-left: 5px;
        }
        .copy-btn:hover {
          color: green;
        }
          
      `}</style>
    </section>
  );
}
