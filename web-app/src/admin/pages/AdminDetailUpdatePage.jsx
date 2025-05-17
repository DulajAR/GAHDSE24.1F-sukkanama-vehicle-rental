import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminDetailUpdate from '../components/AdminDetailUpdate';

const AdminDetailUpdatePage = () => {
  return (
    <>
      <AdminHeader />
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#eef1f5',
          paddingLeft: '20px',
          paddingRight: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '40px',
          gap: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#3a3a3a',
            textShadow: '0 0 8px rgba(40, 167, 69, 0.7)',
            marginBottom: '30px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '1.2px',
          }}
        >
          Admin Update Page
        </h1>
        <AdminDetailUpdate />
      </div>
    </>
  );
};

export default AdminDetailUpdatePage;
