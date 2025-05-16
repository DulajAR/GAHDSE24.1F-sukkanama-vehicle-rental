// src/components/AdminSupplierDetailUpdate.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminSupplierDetailUpdate = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedName, setUpdatedName] = useState('');

  useEffect(() => {
    console.log('Fetching supplier with ID:', id);

    fetch(`http://localhost:8080/supplier/get/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Supplier not found');
        return res.json();
      })
      .then((data) => {
        setSupplier(data);
        setUpdatedName(data.name);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Supplier not found with ID: ${id}`, err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    fetch(`http://localhost:8080/supplier/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...supplier, name: updatedName }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then((data) => {
        alert('Supplier updated successfully!');
        setSupplier(data);
      })
      .catch((err) => {
        console.error('Update failed:', err);
        alert('Error updating supplier.');
      });
  };

  if (loading) return <div>Loading supplier data...</div>;
  if (!supplier) return <div>Supplier not found.</div>;

  return (
    <div>
      <h2>Update Supplier Details</h2>
      <label>
        Supplier Name:
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdate}>Update Supplier</button>
    </div>
  );
};

export default AdminSupplierDetailUpdate;
