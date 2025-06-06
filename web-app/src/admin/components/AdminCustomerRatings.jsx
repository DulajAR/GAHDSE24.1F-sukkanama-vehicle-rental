import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminCustomerRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [customers, setCustomers] = useState({});
  const [suppliers, setSuppliers] = useState({});

  const [customerIdFilter, setCustomerIdFilter] = useState('');
  const [customerEmailFilter, setCustomerEmailFilter] = useState('');
  const [supplierIdFilter, setSupplierIdFilter] = useState('');
  const [supplierEmailFilter, setSupplierEmailFilter] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([fetchRatings(), fetchCustomers(), fetchSuppliers()]);
  };

  const fetchRatings = async () => {
    const querySnapshot = await getDocs(collection(db, 'ratings'));
    const allRatings = [];
    querySnapshot.forEach((docItem) => {
      const data = docItem.data();
      if (data.targetType === 'customer') {
        allRatings.push({ id: docItem.id, ...data });
      }
    });
    setRatings(allRatings);
  };

  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, 'customers'));
    const customerMap = {};
    querySnapshot.forEach((docItem) => {
      const data = docItem.data();
      customerMap[docItem.id] = data.email || 'N/A';
    });
    setCustomers(customerMap);
  };

  const fetchSuppliers = async () => {
    const querySnapshot = await getDocs(collection(db, 'suppliers'));
    const supplierMap = {};
    querySnapshot.forEach((docItem) => {
      const data = docItem.data();
      supplierMap[docItem.id] = data.email || 'N/A';
    });
    setSuppliers(supplierMap);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'ratings', id));
      setRatings((prev) => prev.filter((rating) => rating.id !== id));
      alert('Rating deleted successfully!');
    } catch (error) {
      console.error('Error deleting rating:', error);
      alert('Failed to delete rating.');
    }
  };

  const filteredRatings = ratings.filter((rating) => {
    const customerEmail = customers[rating.targetId] || '';
    const supplierEmail = suppliers[rating.raterId] || '';

    return (
      rating.targetId.toLowerCase().includes(customerIdFilter.toLowerCase()) &&
      customerEmail.toLowerCase().includes(customerEmailFilter.toLowerCase()) &&
      rating.raterId.toLowerCase().includes(supplierIdFilter.toLowerCase()) &&
      supplierEmail.toLowerCase().includes(supplierEmailFilter.toLowerCase())
    );
  });

  return (
    <div className="admin-supplier-ratings-container">
      <button
        className="back-button"
        onClick={() => navigate('/admin/dashboard')}
      >
        &larr; Back
      </button>

      <h2>Supplier Ratings for Customers</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by Customer ID"
          value={customerIdFilter}
          onChange={(e) => setCustomerIdFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Customer Email"
          value={customerEmailFilter}
          onChange={(e) => setCustomerEmailFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Supplier ID"
          value={supplierIdFilter}
          onChange={(e) => setSupplierIdFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Supplier Email"
          value={supplierEmailFilter}
          onChange={(e) => setSupplierEmailFilter(e.target.value)}
        />
      </div>

      <div className="ratings-list">
        {filteredRatings.length > 0 ? (
          filteredRatings.slice(0, 4).map((rating) => (
            <div className="rating-card" key={rating.id}>
              <p><strong>Customer ID:</strong> {rating.targetId}</p>
              <p><strong>Customer Email:</strong> {customers[rating.targetId] || 'Loading...'}</p>
              <p><strong>Supplier ID:</strong> {rating.raterId}</p>
              <p><strong>Supplier Email:</strong> {suppliers[rating.raterId] || 'Loading...'}</p>
              <p><strong>Stars:</strong> {rating.stars}</p>
              <p><strong>Comment:</strong> {rating.comment}</p>
              <p className="timestamp">
                {new Date(rating.timestamp.seconds * 1000).toLocaleString()}
              </p>
              <button className="delete-btn" onClick={() => handleDelete(rating.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No ratings found matching your filters.</p>
        )}
      </div>

      <style>{`
        .back-button {
          margin-bottom: 20px;
          padding: 8px 16px;
          background-color: #6c757d;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        }
        .back-button:hover {
          background-color: #5a6268;
        }
        .admin-supplier-ratings-container {
          padding: 20px;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .admin-supplier-ratings-container h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .filters {
          margin-bottom: 20px;
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .filters input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }

        .ratings-list {
          max-height: 600px;
          overflow-y: auto;
          overflow-x: hidden;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          background-color: #f9f9f9;
          display: grid;
          gap: 10px;
        }

        .rating-card {
          border: 1px solid #ccc;
          padding: 12px;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease;
        }

        .rating-card:hover {
          transform: translateY(-2px);
        }

        .rating-card p {
          margin: 6px 0;
          font-size: 14px;
        }

        .timestamp {
          font-size: 12px;
          color: #777;
        }

        .delete-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
          font-size: 14px;
        }

        .delete-btn:hover {
          background-color: #c0392b;
        }
      `}</style>
    </div>
  );
};

export default AdminCustomerRatings;
