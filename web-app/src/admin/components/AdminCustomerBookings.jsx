import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const AdminCustomerBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const bookingsList = await Promise.all(
          querySnapshot.docs.map(async (bookingDoc) => {
            const booking = { id: bookingDoc.id, ...bookingDoc.data() };

            let customerData = {};
            try {
              const customerDoc = await getDoc(doc(db, "customers", booking.customerId));
              if (customerDoc.exists()) {
                customerData = customerDoc.data();
              }
            } catch (err) {
              console.error("Error fetching customer:", err);
            }

            let supplierData = {};
            try {
              const supplierDoc = await getDoc(doc(db, "suppliers", booking.vehicleOwnerId));
              if (supplierDoc.exists()) {
                supplierData = supplierDoc.data();
              }
            } catch (err) {
              console.error("Error fetching supplier:", err);
            }

            return {
              ...booking,
              customerEmail: customerData.email || "N/A",
              customerPhone: customerData.tel_no || "N/A",
              supplierEmail: supplierData.email || "N/A",
              supplierPhone: supplierData.tel_no || "N/A",
            };
          })
        );

        setBookings(bookingsList);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <div className="customer-table-container">
      <h2>Manage Bookings</h2>
      <button
        onClick={() => navigate("/admin/manage-customers")}
        style={{
          marginBottom: "15px",
          padding: "8px 15px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        &larr; Back
      </button>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by Booking ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Email</th>
                <th>Customer Phone</th>
                <th>Supplier Email</th>
                <th>Supplier Phone</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Vehicle ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings
                .filter((booking) =>
                  booking.id.toLowerCase().includes(searchId.toLowerCase())
                )
                .map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customerEmail}</td>
                    <td>{booking.customerPhone}</td>
                    <td>{booking.supplierEmail}</td>
                    <td>{booking.supplierPhone}</td>
                    <td>{booking.startDate || "N/A"}</td>
                    <td>{booking.endDate || "N/A"}</td>
                    <td>{booking.vehicleId || "N/A"}</td>
                    <td>{booking.status || "Pending"}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .customer-table-container {
          max-width: 100%;
          margin: 50px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .table-wrapper {
          overflow-x: auto;
          overflow-y: auto;
          max-height: 500px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .customer-table {
          width: 100%;
          min-width: 1000px;
          border-collapse: collapse;
        }

        .customer-table th, .customer-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
          white-space: nowrap;
        }

        .customer-table th {
          background-color: #f2f2f2;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .customer-table tr:hover {
          background-color: #f9f9f9;
        }

        .customer-table button:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

export default AdminCustomerBookings;
