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

  if (loading) return <p className="loading-text">Loading vehicles...</p>;
  if (vehicles.length === 0) return <p className="loading-text">No vehicles found.</p>;

  return (
    <div className="vehicle-container">
      <style>{`
        .vehicle-container {
          padding: 1rem;
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .vehicle-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #222;
        }
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          font-size: 1rem;
        }
        .scroll-container {
          max-height: 70vh;
          overflow-y: auto;
          padding: 0 1rem;
        }
        .grid-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        .vehicle-card {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .vehicle-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }
        .vehicle-model {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-align: center;
          color: #333;
        }
        .vehicle-details {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.9rem;
          color: #444;
          width: 100%;
          margin-bottom: 1rem;
        }
        .book-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          width: 100%;
          transition: background-color 0.3s ease;
        }
        .book-button:hover {
          background-color: #0056b3;
        }
        .loading-text {
          text-align: center;
          font-size: 1.2rem;
          color: #777;
          padding: 2rem;
        }
      `}</style>

      <h1 className="vehicle-title">Pick Your Vehicle</h1>

      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="brand-filter">Brand:</label>
          <select id="brand-filter" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
            <option value="all">All Brands</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year-filter">Year:</label>
          <select id="year-filter" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="all">All Years</option>
            {uniqueYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="scroll-container">
        <div className="grid-wrapper">
          {filterAds().map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <img
                src={vehicle.vehicleImageUrl || 'https://via.placeholder.com/300x150'}
                alt={vehicle.model}
                className="vehicle-image"
              />
              <h3 className="vehicle-model">{vehicle.brand} {vehicle.model}</h3>
              <ul className="vehicle-details">
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
                className="book-button"
                onClick={() => navigate(`/loginCustomer?vehicle_id=${vehicle.id}`)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleAds;
