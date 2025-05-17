import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminDetails from '../components/AdminDetails';

const AdminSettingsPage = () => {
  return (
    <>
      <AdminHeader />
      <div
        className="admin-settings-page"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: '80px', // space for fixed header
          backgroundColor: '#eef1f5', // optional: modern background
        }}
      >
        <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '4rem',
              fontWeight: '600',
              color: '#ff0000',
              textShadow: '0 0 5px rgba(44, 62, 80, 0.5)',
              letterSpacing: '1px',
              marginBottom: '0.5rem',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            Admin Settings
          </h2>
          <div style={{ marginTop: '1rem' }}>
            <AdminDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettingsPage;
