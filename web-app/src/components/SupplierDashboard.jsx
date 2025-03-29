import { useEffect, useState } from "react";
import { db, auth } from "../firebase-config"; // Import Firebase db & auth
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const SupplierDashboard = () => {
  const [supplierData, setSupplierData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplierData = async (userEmail) => {
      try {
        const supplierQuery = query(collection(db, "suppliers"), where("email", "==", userEmail));
        const supplierSnapshot = await getDocs(supplierQuery);

        if (!supplierSnapshot.empty) {
          const supplier = supplierSnapshot.docs[0].data();
          setSupplierData(supplier);

          const vehicleQuery = query(collection(db, "vehicles"), where("supplier_id", "==", supplierSnapshot.docs[0].id));
          const vehicleSnapshot = await getDocs(vehicleQuery);
          setVehicles(vehicleSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

          const bookingQuery = query(collection(db, "bookings"), where("supplier_id", "==", supplierSnapshot.docs[0].id));
          const bookingSnapshot = await getDocs(bookingQuery);
          setBookings(bookingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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

  if (loading) return <p>Loading...</p>;
  if (!supplierData) return <p>No supplier data found.</p>;

  return (
    <div className="supplier-dashboard">
      <h1>Supplier Dashboard</h1>
      <h2>Welcome, {supplierData.f_name} {supplierData.l_name}</h2>

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
                <img src={vehicle.image_url} alt={vehicle.model} />
                <h3>{vehicle.model}</h3>
                <p>Category: {vehicle.category}</p>
                <p>Rent per day: ${vehicle.rent_per_day}</p>
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