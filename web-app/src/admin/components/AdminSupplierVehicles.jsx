import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const AdminSupplierVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPlate, setSearchPlate] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const vehicleCollection = collection(db, "vehicles");
      const vehicleSnapshot = await getDocs(vehicleCollection);
      const vehicleList = vehicleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehicles(vehicleList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteDoc(doc(db, "vehicles", id));
        setVehicles((prev) => prev.filter((v) => v.id !== id));
      } catch (err) {
        console.error("Error deleting vehicle:", err);
      }
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(searchPlate.toLowerCase()) &&
      v.id.toLowerCase().includes(searchId.toLowerCase()) &&
      v.userEmail.toLowerCase().includes(searchEmail.toLowerCase())
  );

  if (loading) return <p>Loading vehicles...</p>;

  return (
    <div className="vehicle-table-container">
      <h2>Manage Supplier Vehicles</h2>

      <button
        onClick={() => navigate("/admin/dashboard")}
        className="back-button"
      >
        &larr; Back to Dashboard
      </button>

      {/* Search filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by plate number"
          value={searchPlate}
          onChange={(e) => setSearchPlate(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Search by vehicle ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Search by supplier email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div className="table-wrapper">
        <table className="vehicle-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>360 View</th>
              <th>Plate</th>
              <th>Brand</th>
              <th>Model</th>
              <th>YOM</th>
              <th>Color</th>
              <th>Fuel</th>
              <th>Seats</th>
              <th>Doors</th>
              <th>Per Day (LKR)</th>
              <th>Transmission</th>
              <th>Description</th>
              <th>Supplier Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="15">No vehicles found.</td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <img
                      src={vehicle.vehicleImageUrl}
                      alt="Vehicle"
                      style={{ width: "80px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    {vehicle.view360ImageUrl ? (
                      <a
                        href={vehicle.view360ImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View 360
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{vehicle.plate}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.yom}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.f_type}</td>
                  <td>{vehicle.seat_capacity}</td>
                  <td>{vehicle.no_of_doors}</td>
                  <td>{vehicle.per_day_chrg}</td>
                  <td>{vehicle.t_mission}</td>
                  <td>{vehicle.description}</td>
                  <td>{vehicle.userEmail}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/vehicles/edit/${vehicle.id}`)}
                      style={actionButtonStyle("orange")}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      style={actionButtonStyle("red")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .vehicle-table-container {
          width: 100%;
          max-width: 100%;
          padding: 20px;
          box-sizing: border-box;
          background: #fff;
          font-family: Arial, sans-serif;
        }

        .back-button {
          margin-bottom: 15px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .search-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }

        .table-wrapper {
          overflow-x: auto;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .vehicle-table {
          width: 100%;
          min-width: 1200px;
          border-collapse: collapse;
        }

        .vehicle-table th, .vehicle-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }

        .vehicle-table th {
          background-color: #f2f2f2;
          position: sticky;
          top: 0;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .vehicle-table-container {
            padding: 10px;
          }

          .vehicle-table {
            min-width: 1000px;
          }

          .search-filters input {
            max-width: 100%;
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  maxWidth: "300px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "14px",
};

const actionButtonStyle = (color) => ({
  color: "white",
  backgroundColor: color,
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  marginRight: "5px",
});

export default AdminSupplierVehicles;
