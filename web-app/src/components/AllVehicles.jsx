import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const supplierSnapshot = await getDocs(collection(db, "suppliers"));
        const suppliersMap = {};
        supplierSnapshot.forEach((doc) => {
          const supplier = doc.data();
          suppliersMap[doc.id] = {
            name: `${supplier.f_name} ${supplier.l_name}`,
            phone: supplier.tel_no,
            email: supplier.email,
          };
        });

        const vehicleSnapshot = await getDocs(collection(db, "vehicles"));
        const vehicleList = vehicleSnapshot.docs.map((doc) => {
          const data = doc.data();
          const supplierId = data.userId;

          const supplierInfo = suppliersMap[supplierId] || {
            name: "Unknown",
            phone: "N/A",
            email: "Not specified",
          };

          return {
            id: doc.id,
            ...data,
            yom: data.yom?.toString() || "",
            supplierName: supplierInfo.name,
            supplierPhone: supplierInfo.phone,
            supplierEmail: supplierInfo.email,
          };
        });

        setVehicles(vehicleList);
      } catch (error) {
        console.error("Error fetching vehicles or suppliers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleBookNow = (vehicleId) => {
    navigate(`/book/${vehicleId}`);
  };

  const filterVehicles = () => {
    return vehicles.filter((vehicle) => {
      return (
        (brandFilter === "all" || vehicle.brand === brandFilter) &&
        (yearFilter === "all" || vehicle.yom === yearFilter)
      );
    });
  };

  const uniqueBrands = [...new Set(vehicles.map((vehicle) => vehicle.brand))];
  const uniqueYears = [
    ...new Set(vehicles.map((vehicle) => vehicle.yom)),
  ].sort((a, b) => b.localeCompare(a)).reverse();

  if (loading) return <p style={styles.loadingText}>Loading vehicles...</p>;
  if (vehicles.length === 0) return <p style={styles.loadingText}>No vehicles found.</p>;

  return (
    <div style={styles.container}>
      {/* Back to Dashboard Button */}
      <button onClick={() => navigate("/customer-dashboard")} style={styles.backButton}>
        ← Back to Dashboard
      </button>

      <h1 style={styles.title}>All Available Vehicles</h1>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <label htmlFor="brand-filter">Filter by Brand:</label>
        <select
          id="brand-filter"
          onChange={(e) => setBrandFilter(e.target.value)}
          value={brandFilter}
        >
          <option value="all">All Brands</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <label htmlFor="year-filter">Filter by Year:</label>
        <select
          id="year-filter"
          onChange={(e) => setYearFilter(e.target.value)}
          value={yearFilter}
        >
          <option value="all">All Years</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Display Filtered Vehicles */}
      <div style={styles.scrollContainer}>
        {filterVehicles().map((vehicle) => (
          <div key={vehicle.id} style={styles.card}>
            <img
              src={vehicle.vehicleImageUrl}
              alt={vehicle.model}
              style={styles.image}
            />
            <h2 style={styles.modelTitle}>
              {vehicle.brand} {vehicle.model}
            </h2>
            <div style={styles.details}>
              <p><strong>Engine:</strong> {vehicle.eng_capacity}</p>
              <p><strong>Fuel:</strong> {vehicle.f_type}</p>
              <p><strong>Transmission:</strong> {vehicle.t_mission}</p>
              <p><strong>Seats:</strong> {vehicle.seat_capacity}</p>
              <p><strong>Year:</strong> {vehicle.yom || "N/A"}</p>
              <p><strong>Color:</strong> {vehicle.color}</p>
              <p><strong>Price/Day:</strong> Rs. {vehicle.per_day_chrg}</p>
              <hr />
              <p><strong>Supplier Name:</strong> {vehicle.supplierName}</p>
              <p><strong>Supplier Phone:</strong> {vehicle.supplierPhone}</p>
              <p><strong>Supplier Email:</strong> {vehicle.supplierEmail}</p>

              <button
                style={styles.bookButton}
                onClick={() => handleBookNow(vehicle.id)}
              >
                Book Now
              </button>
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
  backButton: {
    marginBottom: "1rem",
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1rem",
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
  bookButton: {
    marginTop: "1rem",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s ease",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
    padding: "2rem",
  },
};

export default AllVehicles;
