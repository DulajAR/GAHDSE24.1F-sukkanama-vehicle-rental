import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const SupplierDashboard = () => {
  const [supplierData, setSupplierData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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
          const supplier = supplierSnapshot.docs[0].data();
          setSupplierData(supplier);

          const supplierId = supplierSnapshot.docs[0].id;

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
            where("userId", "==", supplierId)
          );
          const bookingSnapshot = await getDocs(bookingQuery);
          setBookings(
            bookingSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSupplierData(user.email);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (vehicleId) => {
    try {
      await deleteDoc(doc(db, "vehicles", vehicleId));
      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
      alert("Vehicle deleted successfully.");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle.");
    }
  };

  const handleUpdate = (vehicleId) => {
    navigate(`/update-vehicle/${vehicleId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!supplierData) return <p>No supplier data found.</p>;

  return (
    <div className="supplier-dashboard">
      <h1>Supplier Dashboard</h1>
      <h2>
        Welcome, {supplierData.f_name} {supplierData.l_name}
      </h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => navigate("/supplier-login")}>Back</button>
        <button onClick={() => navigate("/register-vehicle")}>Add Vehicle</button>
      </div>

      <section className="supplier-info">
        <h2>Your Information</h2>
        <p><strong>Email:</strong> {supplierData.email}</p>
        <p><strong>NIC:</strong> {supplierData.nic}</p>
        <p><strong>Registered on:</strong> {supplierData.reg_date}</p>
        <p><strong>Tax ID:</strong> {supplierData.tax_id}</p>
        <p><strong>Phone Number:</strong> {supplierData.tel_no}</p>
      </section>

      <section>
        <h2>Your Vehicles</h2>
        <div className="vehicle-card-container">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <img
                  src={vehicle.vehicleImageUrl}
                  alt={vehicle.model}
                  style={{ width: "200px", height: "auto" }}
                />
                <h3>{vehicle.model}</h3>
                <p><strong>Brand:</strong> {vehicle.brand}</p>
                <p><strong>Engine Capacity:</strong>

Dulaj Ayya, [5/3/2025 3:02 PM]
{vehicle.eng_capacity}</p>
                <p><strong>Fuel Type:</strong> {vehicle.f_type}</p>
                <p><strong>Transmission:</strong> {vehicle.t_mission}</p>
                <p><strong>Seats:</strong> {vehicle.seat_capacity}</p>
                <p><strong>Year of Manufacture:</strong> {vehicle.yom}</p>
                <p><strong>Color:</strong> {vehicle.color}</p>
                <p><strong>Price per Day:</strong> Rs.{vehicle.per_day_chrg}</p>
                <p><strong>Description:</strong> {vehicle.description}</p>

                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => handleUpdate(vehicle.id)}>Update</button>
                  <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No vehicles found.</p>
          )}
        </div>
      </section>

      <section>
        <h2>Recent Bookings</h2>
        {bookings.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Vehicle</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.vehicle_name}</td>
                  <td>{booking.customer_name}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No bookings found.</p>
        )}
      </section>
    </div>
  );
};

export default SupplierDashboard;