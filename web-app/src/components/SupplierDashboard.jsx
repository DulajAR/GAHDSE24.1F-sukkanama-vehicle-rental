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
          setVehicles(
            vehicleSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );

          const bookingQuery = query(
            collection(db, "bookings"),
            where("vehicleOwnerId", "==", supplierId)
          );
          const bookingSnapshot = await getDocs(bookingQuery);
          const rawBookings = bookingSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Fetch customer names using customerId
          const bookingsWithCustomerNames = await Promise.all(
            rawBookings.map(async (booking) => {
              let customerName = "Unknown";
              if (booking.customerId) {
                const customerDoc = await getDoc(doc(db, "customers", booking.customerId));
                if (customerDoc.exists()) {
                  const customerData = customerDoc.data();
                  customerName = `${customerData.f_name || ""} ${customerData.l_name || ""}`;
                }
              }
              return { ...booking, customerName };
            })
          );

          setBookings(bookingsWithCustomerNames);
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

  const handleEdit = (vehicleId) => {
    navigate(`/update-vehicle/${vehicleId}`);
  };

  const handleView360 = (imageUrl) => {
    setSelected360Image(imageUrl);
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status,
      });
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

  if (loading) return <p style={styles.loading}>Loading dashboard...</p>;
  if (!supplierData) return <p>No supplier data found.</p>;

  return (
    <div style={styles.container}>
      <h1>Supplier Dashboard</h1>
      <h2>Welcome, {supplierData.f_name} {supplierData.l_name}</h2>

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
                <th>Customer Name</th>
                <th>Customer Email</th>
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
                  <td>{booking.customerName}</td>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.status || "Pending"}</td>
                  <td>
                    <button onClick={() => handleBookingAction(booking.id, "Accepted")}>Accept</button>
                    <button onClick={() => handleBookingAction(booking.id, "Rejected")} style={{ marginLeft: "0.5rem" }}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </section>

      {selected360Image && (
        <div>
          <h3>360° Viewer</h3>
          <div ref={viewerRef} style={{ width: "100%", height: "500px" }} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "1.5rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "auto",
  },
  section: {
    marginBottom: "2rem",
  },
  vehiclesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    width: "300px",
  },
  vehicleImage: {
    width: "100%",
    height: "auto",
    marginBottom: "0.5rem",
  },
  cardButtons: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  loading: {
    fontSize: "1.2rem",
    textAlign: "center",
    marginTop: "2rem",
  },
};

export default SupplierDashboard;
