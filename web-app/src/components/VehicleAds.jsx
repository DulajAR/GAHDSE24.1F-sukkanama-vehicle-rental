import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const VehicleAds = () => {
  const [vehicles, setVehicles] = useState([]);
  const [brandFilter, setBrandFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehicleSnapshot = await getDocs(collection(db, 'vehicles'));
        const supplierSnapshot = await getDocs(collection(db, 'suppliers'));

        const suppliersMap = {};
        supplierSnapshot.forEach(doc => {
          const data = doc.data();
          suppliersMap[doc.id] = {
            name: `${data.f_name} ${data.l_name}`,
            phone: data.tel_no,
            email: data.email
          };
        });

        const vehicleList = vehicleSnapshot.docs.map(doc => {
          const data = doc.data();
          const supplier = suppliersMap[data.userId] || {
            name: 'Unknown',
            phone: 'N/A',
            email: 'Not provided'
          };
          return {
            id: doc.id,
            ...data,
            yom: data.yom?.toString() || '',
            supplierName: supplier.name,
            supplierPhone: supplier.phone,
            supplierEmail: supplier.email
          };
        });

        setVehicles(vehicleList);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filterAds = () => {
    return vehicles.filter(vehicle =>
      (brandFilter === 'all' || vehicle.brand === brandFilter) &&
      (yearFilter === 'all' || vehicle.yom === yearFilter)
    );
  };

  const uniqueBrands = [...new Set(vehicles.map(vehicle => vehicle.brand))];
  const uniqueYears = [...new Set(vehicles.map(vehicle => vehicle.yom))].sort();

  if (loading) return <p style={styles.loadingText}>Loading vehicles...</p>;
  if (vehicles.length === 0) return <p style={styles.loadingText}>No vehicles found.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pick Your Vehicle</h1>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <label htmlFor="brand-filter">Brand:</label>
        <select id="brand-filter" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
          <option value="all">All Brands</option>
          {uniqueBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <label htmlFor="year-filter">Year:</label>
        <select id="year-filter" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="all">All Years</option>
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Horizontal Scrollable Cards */}
      <div style={styles.scrollContainer}>
        {filterAds().map(vehicle => (
          <div key={vehicle.id} style={styles.card}>
            <img src={vehicle.vehicleImageUrl || 'https://via.placeholder.com/300x150'} alt={vehicle.model} style={styles.image} />
            <h3 style={styles.model}>{vehicle.brand} {vehicle.model}</h3>
            <ul style={styles.details}>
              <li><strong>Plate:</strong> {vehicle.plate_no || 'N/A'}</li>
              <li><strong>Year:</strong> {vehicle.yom}</li>
              <li><strong>Seats:</strong> {vehicle.seat_capacity}</li>
              <li><strong>Fuel:</strong> {vehicle.f_type}</li>
              <li><strong>Engine:</strong> {vehicle.eng_capacity}</li>
              <li><strong>Transmission:</strong> {vehicle.t_mission}</li>
              <li><strong>Color:</strong> {vehicle.color}</li>
              <li><strong>Price/Day:</strong> Rs.{vehicle.per_day_chrg}</li>
            </ul>
            <button
              style={styles.bookButton}
              onClick={() => navigate(`/loginCustomer?vehicle_id=${vehicle.id}`)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    gap: '1rem',
    padding: '1rem',
  },
  card: {
    flex: '0 0 auto',
    width: '300px',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  model: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    color: '#222',
  },
  details: {
    listStyle: 'none',
    padding: 0,
    fontSize: '0.95rem',
    color: '#555',
    width: '100%',
    marginBottom: '1rem',
  },
  bookButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#777',
    padding: '2rem',
  }
};

export default VehicleAds;
