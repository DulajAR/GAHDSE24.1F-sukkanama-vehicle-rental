// src/pages/AdminSupplierDetailUpdatePage.jsx

import React from 'react';
import AdminHeader from '../components/AdminHeader';  // import AdminHeader
import AdminSupplierDetailUpdate from '../components/AdminSupplierDetailUpdate';

const AdminSupplierDetailUpdatePage = () => {
  return (
    <>
      <AdminHeader />
      <div
        style={{
          paddingTop: '80px', // same as header height to avoid overlap
          minHeight: '100vh',
          backgroundColor: '#eef1f5', // optional background for consistency
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <h1>Admin - Supplier Update Page</h1>
        <AdminSupplierDetailUpdate />
      </div>
    </>
  );
};

export default AdminSupplierDetailUpdatePage;
