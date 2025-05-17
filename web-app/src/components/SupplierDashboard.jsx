import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const SupplierDashboard = () => {
  const [supplierData, setSupplierData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected360Image, setSelected360Image] = useState(null);
  const [viewer, setViewer] = useState(null);
  const viewerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplierData = async (userEmail) => {
      try {
        const supplierQuery = query(
          collection(db, "suppliers"),
          where("email", "==", userEmail)
        );
        const supplierSnapshot = await getDocs(supplierQuery);

        if (!supplierSnapshot.empty) {
          const supplierDoc = supplierSnapshot.docs[0];
          const supplier = supplierDoc.data();
          setSupplierData({ ...supplier, id: supplierDoc.id });

          const supplierId = supplierDoc.id;

          const vehicleQuery = query(
            collection(db, "vehicles"),
            where("userId", "==", supplierId)
          );
          const vehicleSnapshot = await getDocs(vehicleQuery);
          const vehicleList = vehicleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setVehicles(vehicleList);

          const bookingQuery = query(
            collection(db, "bookings"),
            where("vehicleOwnerId", "==", supplierId)
          );
          const bookingSnapshot = await getDocs(bookingQuery);
          const rawBookings = bookingSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const bookingsWithDetails = await Promise.all(
            rawBookings.map(async (booking) => {
              let customerName = "Unknown";
              if (booking.customerId) {
                const customerDoc = await getDoc(
                  doc(db, "customers", booking.customerId)
                );
                if (customerDoc.exists()) {
                  const customerData = customerDoc.data();
                  customerName = `${customerData.f_name || ""} ${
                    customerData.l_name || ""
                  }`;
                }
              }

              const vehicle = vehicleList.find((v) => v.id === booking.vehicleId);
              return {
                ...booking,
                customerName,
                customerEmail: booking.customerEmail || "N/A",
                phone: booking.phone || "N/A",
                startDate: booking.startDate || "N/A",
                endDate: booking.endDate || "N/A",
                status: booking.status || "Pending",
                vehicleModel: vehicle?.model || "Unknown",
                vehicleImage: vehicle?.vehicleImageUrl || "",
                vehiclePlate: vehicle?.plate || "N/A",
              };
            })
          );

          setBookings(bookingsWithDetails);
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSupplierData(user.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleDelete = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteDoc(doc(db, "vehicles", vehicleId));
        setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
        alert("Vehicle deleted.");
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert("Failed to delete.");
      }
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteDoc(doc(db, "bookings", bookingId));
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        alert("Booking deleted.");
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Failed to delete booking.");
      }
    }
  };






const [unavailableDates, setUnavailableDates] = useState({});

useEffect(() => {
  const fetchAndSetUnavailableDates = async () => {
    const newUnavailableDates = {};
    for (const vehicle of vehicles) {
      const dates = await fetchUnavailableDates(vehicle.id);
      newUnavailableDates[vehicle.id] = dates;
    }
    setUnavailableDates(newUnavailableDates);
  };

  if (vehicles.length > 0) {
    fetchAndSetUnavailableDates();
  }
}, [vehicles]);









  const handleEdit = (vehicleId) => {
    navigate(`/update-vehicle/${vehicleId}`);
  };

  const handleView360 = (imageUrl) => {
    setSelected360Image(imageUrl);
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  useEffect(() => {
    if (selected360Image && viewerRef.current) {
      if (viewer) viewer.destroy();
      const newViewer = new Viewer({
        container: viewerRef.current,
        panorama: selected360Image,
        navbar: ["zoom", "fullscreen"],
      });
      setViewer(newViewer);
    }
  }, [selected360Image]);

 const fetchUnavailableDates = async (vehicleId) => {
  try {
    const bookingQuery = query(
      collection(db, "bookings"),
      where("vehicleId", "==", vehicleId),
      where("status", "==", "Accepted") // Filter by "Accepted" bookings
    );

    const bookingSnapshot = await getDocs(bookingQuery);
    
    // Array to hold unavailable dates
    const unavailableDates = [];

    // Iterate over each booking and collect start and end dates
    bookingSnapshot.forEach((doc) => {
      const bookingData = doc.data();
      const startDate = new Date(bookingData.startDate).toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const endDate = new Date(bookingData.endDate).toISOString().split('T')[0]; // Format: YYYY-MM-DD
      unavailableDates.push(startDate);
      unavailableDates.push(endDate);

      // If there are multiple days between start and end, add all intermediate dates
      let currentDate = new Date(bookingData.startDate);
      while (currentDate <= new Date(bookingData.endDate)) {
        unavailableDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    });

    return unavailableDates;
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
    return [];
  }
};


  if (loading) return <p style={styles.loading}>Loading dashboard...</p>;
  if (!supplierData) return <p>No supplier data found.</p>;







 return (
  <div style={styles.container}>
    <h1 style={styles.heading1}>Supplier Dashboard</h1>
    <h2 style={styles.heading2}>
      Welcome, {supplierData.f_name} {supplierData.l_name}
    </h2>

    <div style={styles.buttonGroup}>
      <button
        style={styles.button}
        onClick={() => navigate("/supplier-login")}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Log Out
      </button>
      <button
        style={styles.button}
        onClick={() => navigate("/register-vehicle")}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Add Vehicle
      </button>
    </div>








<section className="booking-table-container">
  <h1>Your Information</h1>
  <h2><strong>Email:</strong> {supplierData.email}</h2>
  <h2><strong>NIC:</strong> {supplierData.nic}</h2>
  <h2><strong>Registered on:</strong> {supplierData.reg_date}</h2>
  <h2><strong>Tax ID:</strong> {supplierData.tax_id}</h2>
  <h2><strong>Phone Number:</strong> {supplierData.tel_no}</h2>

  <style>{`
    .booking-table-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 30px 20px;
      background: #f9f9f9; /* light gray background for soft look */
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      font-size: 1.2rem;
      line-height: 1.8;
      color: #34495e; /* dark gray-blue for body text */
    }

    .booking-table-container h1 {
      font-size: 2.8rem;
      color: #2c3e50; /* deep navy blue */
      font-weight: 900;
      margin-bottom: 30px;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.15);
    }

    .booking-table-container h2 {
      margin: 12px 0;
      font-weight: 600;
      color: #1a5276; /* elegant mid-blue for labels */
    }

    .booking-table-container h2 strong {
      color: #2980b9; /* distinct blue for the "label" part (e.g., Email:) */
    }
  `}</style>
</section>





     




<section className="vehicle-section">
  <h3>Your Vehicles</h3>
  <div className="vehicle-scroll-wrapper">
    <div className="vehicle-horizontal-scroll">
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card">
            <img
              src={vehicle.vehicleImageUrl}
              alt={vehicle.model}
              className="vehicle-img"
            />

            {/* Vehicle ID */}
            <div className="vehicle-id-block">
              <label>Vehicle ID:</label>
              <div className="vehicle-id-wrapper">
                <code className="vehicle-id">{vehicle.id}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(vehicle.id);
                    alert("Vehicle ID copied!");
                  }}
                  className="copy-btn"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Plate Number with Copy */}
            <div className="plate-block">
              <label>Plate Number:</label>
              <div className="plate-id-wrapper">
                <span className="plate-number">{vehicle.plate}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(vehicle.plate);
                    alert("Plate number copied!");
                  }}
                  className="copy-btn"
                >
                  Copy
                </button>
              </div>
            </div>

            <h3>{vehicle.model}</h3>
            <p><strong>Brand:</strong> {vehicle.brand}</p>
            <p><strong>Engine:</strong> {vehicle.eng_capacity}</p>
            <p><strong>Fuel:</strong> {vehicle.f_type}</p>
            <p><strong>Transmission:</strong> {vehicle.t_mission}</p>
            <p><strong>Seats:</strong> {vehicle.seat_capacity}</p>
            <p><strong>Year:</strong> {vehicle.yom}</p>
            <p><strong>Color:</strong> {vehicle.color}</p>
            <p><strong>Price/Day:</strong> Rs.{vehicle.per_day_chrg}</p>
            <p><strong>Description:</strong> {vehicle.description}</p>

            {vehicle.view360ImageUrl ? (
              <button onClick={() => handleView360(vehicle.view360ImageUrl)}>
                View 360 Image
              </button>
            ) : (
              <p className="no-360">No 360 image</p>
            )}

            <div className="card-buttons">
              <button onClick={() => handleEdit(vehicle.id)}>Update</button>
              <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h5>Vehicle Availability</h5>
              <Calendar
                onChange={(date) => handleDateChange(vehicle.id, date)}
                value={new Date()}
                tileDisabled={({ date }) => {
                  const dateString = date.toISOString().split("T")[0];
                  return unavailableDates[vehicle.id]?.includes(dateString);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No vehicles found.</p>
      )}
    </div>
  </div>

  <style>{`
    .vehicle-section {
      max-width: 100%;
      margin: 50px auto;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
    }

    .vehicle-section h3 {
      font-size: 2.4rem;
      font-weight: 800;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    }

    .vehicle-scroll-wrapper {
      overflow-x: auto;
      padding: 10px 0;
    }

    .vehicle-horizontal-scroll {
      display: flex;
      gap: 20px;
      justify-content: flex-start;
      padding-left: 20px;
      min-width: fit-content;
    }

    .vehicle-card {
      min-width: 300px;
      max-width: 320px;
      flex-shrink: 0;
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 10px;
      background-color: #fafafa;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .vehicle-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    .card-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .card-buttons button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .card-buttons button:hover {
      background-color: #0056b3;
    }

    .vehicle-card button {
      margin-top: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      padding: 6px 10px;
      border-radius: 5px;
      cursor: pointer;
    }

    .vehicle-card button:hover {
      background-color: #218838;
    }

    .no-360 {
      font-size: 0.85rem;
      color: gray;
      margin-top: 5px;
    }

    .vehicle-id-block,
    .plate-block {
      margin: 10px 0;
      padding: 8px;
      background-color: #f3f3f3;
      border-left: 4px solid #007bff;
      border-radius: 5px;
      font-family: 'Courier New', Courier, monospace;
    }

    .vehicle-id-wrapper,
    .plate-id-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .vehicle-id,
    .plate-number {
      background-color: #e9ecef;
      padding: 5px 8px;
      border-radius: 4px;
      font-size: 0.95rem;
      word-break: break-all;
      flex-grow: 1;
      margin-right: 10px;
    }

    .plate-number {
      font-weight: bold;
      color: #343a40;
      letter-spacing: 1px;
    }

    .copy-btn {
      background-color: #343a40;
      color: white;
      border: none;
      padding: 6px 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .copy-btn:hover {
      background-color: #1d2124;
    }
  `}</style>
</section>









<section className="booking-table-container">
  <h2>Recent Bookings</h2>

  {bookings.length > 0 ? (
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
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
                  onClick={() =>
                    navigator.clipboard.writeText(booking.vehicleId)
                  }
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
                    color: "yellow",
                    marginRight: "5px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    fontWeight: "bold",
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleBookingAction(booking.id, "Rejected")}
                  style={{
                    color: "orange",
                    marginRight: "5px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    fontWeight: "bold",
                  }}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
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









   <div
      ref={viewerRef}
      style={{ width: "100%", height: "500px", marginTop: "20px" }}
    ></div>
  </div>
);
};

const styles = {
  container: {
    fontFamily: '"Open Sans", "Segoe UI", Tahoma, Geneva, sans-serif',

    padding: "20px",
    margin: "50px auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    maxWidth: "100%",
    textAlign: "center",
  },
  heading1: {
    fontSize: "5rem",
    color: "#ffc107	",
    marginBottom: "10px",
  },
  heading2: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "30px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  section: {
    marginBottom: "30px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
  },
  vehiclesContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    width: "300px",
    textAlign: "center",
  },
  vehicleImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  cardButtons: {
    marginTop: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};


export default SupplierDashboard;