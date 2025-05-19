import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Booking filter form
function SupplierVehicleBookingFilter({ onFilter }) {
  const [plateNo, setPlateNo] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [bookingId, setBookingId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ plateNo, vehicleId, bookingId });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
    >
      <input
        type="text"
        placeholder="Plate No"
        value={plateNo}
        onChange={(e) => setPlateNo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Vehicle ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />
      <button type="submit">Filter</button>
    </form>
  );
}

// Main Dashboard Component
export default function SupplierDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const bookingsSnapshot = await getDocs(collection(db, "bookings"));
      const vehiclesSnapshot = await getDocs(collection(db, "vehicles"));
      const customersSnapshot = await getDocs(collection(db, "customers"));

      const vehiclesMap = {};
      vehiclesSnapshot.forEach((doc) => {
        vehiclesMap[doc.id] = doc.data();
      });

      const customersMap = {};
      customersSnapshot.forEach((doc) => {
        customersMap[doc.id] = doc.data();
      });

      const bookingList = bookingsSnapshot.docs.map((doc) => {
        const data = doc.data();
        const vehicle = vehiclesMap[data.vehicleId] || {};
        const customer = customersMap[data.customerId] || {};

        return {
          id: doc.id,
          ...data,
          vehiclePlate: vehicle.plate || "N/A",
          vehicleModel: vehicle.model || "Unknown Model",
          vehicleImage: vehicle.vehicleImageUrl || "https://via.placeholder.com/80",
          customerName: `${customer.f_name || ""} ${customer.l_name || ""}`.trim(),
          customerEmail: customer.email || "N/A",
          phone: customer.tel_no || "N/A",
        };
      });

      setBookings(bookingList);
      setFilteredBookings(bookingList);
    };

    fetchData();
  }, []);

  const handleFilter = ({ plateNo, vehicleId, bookingId }) => {
    if (!plateNo && !vehicleId && !bookingId) {
      alert("Please enter at least one filter criteria.");
      return;
    }

    let filtered = bookings;

    if (plateNo) {
      filtered = filtered.filter((b) =>
        b.vehiclePlate?.toLowerCase().includes(plateNo.toLowerCase())
      );
    }
    if (vehicleId) {
      filtered = filtered.filter((b) =>
        b.vehicleId?.toLowerCase().includes(vehicleId.toLowerCase())
      );
    }
    if (bookingId) {
      filtered = filtered.filter((b) =>
        b.id?.toLowerCase().includes(bookingId.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const handleBookingAction = (id, newStatus) => {
    const updated = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updated);
    setFilteredBookings(updated);
  };

  const handleDeleteBooking = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmed) {
      const updated = bookings.filter((booking) => booking.id !== id);
      setBookings(updated);
      setFilteredBookings(updated);
    }
  };

  const handleAddRating = (booking) => {
    navigate("/rate-customer", { state: { booking } });
  };

  return (
    <section className="booking-table-container">
      <h2>Bookings Filter</h2>
      <SupplierVehicleBookingFilter onFilter={handleFilter} />

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
