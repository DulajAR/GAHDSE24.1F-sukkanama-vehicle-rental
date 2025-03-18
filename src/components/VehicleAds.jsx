import React, { useState, useEffect } from 'react';

const VehicleAds = () => {
  const [vehicles, setVehicles] = useState([]);
  const [brandFilter, setBrandFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  useEffect(() => {
    // Fetch vehicle data from an API or local JSON file
    const fetchVehicles = async () => {
      const response = await fetch('/api/vehicles'); // Replace with your API endpoint
      const data = await response.json();
      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  const filterAds = () => {
    return vehicles.filter(vehicle => {
      return (brandFilter === 'all' || vehicle.brand === brandFilter) &&
             (yearFilter === 'all' || vehicle.yom === yearFilter);
    });
  };

  return (
    <div className="vehicle-ads-section">
      <h1>Pick your vehicle</h1>
      <div className="filter-container">
        <label htmlFor="brand-filter">Filter by Brand:</label>
        <select id="brand-filter" onChange={(e) => setBrandFilter(e.target.value)}>
          <option value="all">All Brands</option>
          {[...new Set(vehicles.map(vehicle => vehicle.brand))].map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <label htmlFor="year-filter">Filter by Year:</label>
        <select id="year-filter" onChange={(e) => setYearFilter(e.target.value)}>
          <option value="all">All Years</option>
          {[...new Set(vehicles.map(vehicle => vehicle.yom))].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="vehicle-ads-container">
        {filterAds().map(vehicle => (
          <div key={vehicle.vehicle_id} className="vehicle-ad" data-brand={vehicle.brand} data-year={vehicle.yom}>
            <img src={vehicle.photo_filename || 'placeholder_image.jpg'} alt="Vehicle" />
            <div className="vehicle-ad-details">
              <ul>
                <li>Plate: {vehicle.plate}</li>
                <li>Brand: {vehicle.brand}</li>
                <li>Model: {vehicle.model}</li>
                <li>Year: {vehicle.yom}</li>
                <li>Rental Price: Rs.{vehicle.per_day_chrg}/day</li>
              </ul>
              <a href={`/loginCustomer?vehicle_id=${vehicle.vehicle_id}`} className="book-now-btn">Book Now</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleAds;
