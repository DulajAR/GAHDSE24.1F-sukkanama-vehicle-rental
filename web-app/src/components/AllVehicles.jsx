import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const vehicleCollection = collection(db, "vehicles");
        const querySnapshot = await getDocs(vehicleCollection);
        const vehicleList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(vehicleList);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVehicles();
  }, []);

  if (loading) return <p style={styles.loadingText}>Loading vehicles...</p>;
  if (vehicles.length === 0) return <p style={styles.loadingText}>No vehicles found.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Available Vehicles</h1>
      <div style={styles.scrollContainer}>
        {vehicles.map(vehicle => (
          <div key={vehicle.id} style={styles.card}>
            <img
              src={vehicle.vehicleImageUrl}
              alt={vehicle.model}
              style={styles.image}
            />
            <h2 style={styles.modelTitle}>{vehicle.brand} {vehicle.model}</h2>
            <div style={styles.details}>
              <p><strong>Engine:</strong> {vehicle.eng_capacity}</p>
              <p><strong>Fuel:</strong> {vehicle.f_type}</p>
              <p><strong>Transmission:</strong> {vehicle.t_mission}</p>
              <p><strong>Seats:</strong> {vehicle.seat_capacity}</p>
              <p><strong>Year:</strong> {vehicle.yom}</p>
              <p><strong>Color:</strong> {vehicle.color}</p>
              <p><strong>Price/Day:</strong> Rs. {vehicle.per_day_chrg}</p>
              <p><strong>Supplier:</strong> {vehicle.supplier_email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  scrollContainer: {
    display: "flex",
    overflowX: "auto",
    gap: "1rem",
    paddingBottom: "1rem",
    paddingLeft: "1rem",
  },
  card: {
    flex: "0 0 auto",
    width: "300px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  modelTitle: {
    fontSize: "1.25rem",
    margin: "0.5rem 0",
    color: "#222",
  },
  details: {
    fontSize: "0.95rem",
    color: "#555",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
    padding: "2rem",
  }
};

export default AllVehicles;
