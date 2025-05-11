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
      <h1>Supplier Dashboard</h1>
      <h2>
        Welcome, {supplierData.f_name} {supplierData.l_name}
      </h2>

      <div style={styles.buttonGroup}>
        <button onClick={() => navigate("/supplier-login")}>Back</button>
        <button onClick={() => navigate("/register-vehicle")}>Add Vehicle</button>
      </div>

      <section style={styles.section}>
        <h3>Your Information</h3>
        <p><strong>Email:</strong> {supplierData.email}</p>
        <p><strong>NIC:</strong> {supplierData.nic}</p>
        <p><strong>Registered on:</strong> {supplierData.reg_date}</p>
        <p><strong>Tax ID:</strong> {supplierData.tax_id}</p>
        <p><strong>Phone Number:</strong> {supplierData.tel_no}</p>
      </section>

      <section style={styles.section}>
        <h3>Your Vehicles</h3>
        <div style={styles.vehiclesContainer}>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <div key={vehicle.id} style={styles.card}>
                <img
                  src={vehicle.vehicleImageUrl}
                  alt={vehicle.model}
                  style={styles.vehicleImage}
                />
                <h4>{vehicle.model}</h4>
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
                  <p style={{ fontSize: "0.85rem", color: "gray" }}>No 360 image</p>
                )}

                <div style={styles.cardButtons}>
                  <button onClick={() => handleEdit(vehicle.id)}>Update</button>
                  <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                </div>

               <div style={{ marginTop: "20px" }}>
  <h5>Vehicle Availability</h5>
  <Calendar
    onChange={(date) => handleDateChange(vehicle.id, date)}
    value={new Date()} // Default to current date
    tileDisabled={({ date }) => {
      const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
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
      </section>

      <section style={styles.section}>
        <h3>Recent Bookings</h3>
        {bookings.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Plate No</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Start</th>
                <th>End</th>
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
                  <td>{booking.status}</td>
                  <td>
                    <button
                      onClick={() => handleBookingAction(booking.id, "Accepted")}
                    >
                      Accept
                    </button>
                <button
                  onClick={() => handleBookingAction(booking.id, "Rejected")}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No bookings found.</p>
    )}
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
fontFamily: "Arial, sans-serif",
padding: "20px",
},
section: {
marginBottom: "30px",
},
buttonGroup: {
marginBottom: "20px",
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