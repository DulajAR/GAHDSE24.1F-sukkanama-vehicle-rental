import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [selected360Image, setSelected360Image] = useState(null);
  const [viewer, setViewer] = useState(null);
  const viewerRef = useRef(null);
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

  useEffect(() => {
    if (selected360Image && viewerRef.current) {
      if (viewer) {
        viewer.destroy();
      }

      const newViewer = new Viewer({
        container: viewerRef.current,
        panorama: selected360Image,
        navbar: ["zoom", "fullscreen"],
      });
      setViewer(newViewer);
    }
  }, [selected360Image]);

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

  const uniqueBrands = [...new Set(vehicles.map((v) => v.brand))];
  const uniqueYears = [...new Set(vehicles.map((v) => v.yom))].sort();

  if (loading) return <p style={styles.loadingText}>Loading vehicles...</p>;
  if (vehicles.length === 0) return <p style={styles.loadingText}>No vehicles found.</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/customer-dashboard")} style={styles.backButton}>
        ← Back to Dashboard
      </button>

      <h1 style={styles.title}>All Available Vehicles</h1>

      <div style={styles.filterContainer}>
        <label htmlFor="brand-filter">Filter by Brand:</label>
        <select
          id="brand-filter"
          onChange={(e) => setBrandFilter(e.target.value)}
          value={brandFilter}
        >
          <option value="all">All Brands</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
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
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

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

              <div style={styles.buttonContainer}>
                <button
                  style={styles.bookButton}
                  onClick={() => handleBookNow(vehicle.id)}
                >
                  Book Now
                </button>

                {vehicle.view360ImageUrl && (
                  <button
                    style={styles.previewButton}
                    onClick={() => setSelected360Image(vehicle.view360ImageUrl)}
                  >
                    View in 360°
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected360Image && (
        <div style={styles.modalOverlay} onClick={() => setSelected360Image(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div ref={viewerRef} style={{ width: "100%", height: "500px" }}></div>
            <button style={styles.closeButton} onClick={() => setSelected360Image(null)}>✖ Close</button>
          </div>
        </div>
      )}
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  bookButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "48%",
  },
  previewButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "48%",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
    padding: "2rem",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    maxWidth: "90%",
    width: "800px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    fontSize: "1.5rem",
    border: "none",
    cursor: "pointer",
  },
};

export default AllVehicles;
