import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase imports
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Icons
import { FaUser, FaEnvelope, FaIdCard, FaCarSide, FaPhone, FaCalendarAlt } from 'react-icons/fa';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          const docRef = doc(db, 'customers', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCustomer(docSnap.data());
            setError(null);
          } else {
            setError('No customer data found');
            setCustomer(null);
          }
        } catch (err) {
          setError('Failed to fetch customer data');
          setCustomer(null);
          console.error(err);
        }
      } else {
        setError('User not logged in');
        setCustomer(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleViewVehicles = () => {
    navigate('/all-vehicles');
  };

  const styles = {
    outerWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '50px',
      // Slight horizontal shift to right, adjust if needed:
      paddingLeft: '15px',  
    },
    container: {
      maxWidth: '480px',
      width: '100%',
      background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
      borderRadius: '20px',
      padding: '40px 30px',
      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
      color: '#222',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: '700',
      color: '#0d3b66',
      marginBottom: '30px',
      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '18px',
      fontSize: '17px',
      color: '#1b1b1b',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '12px 18px',
      borderRadius: '12px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
      gap: '15px',
    },
    icon: {
      color: '#0d3b66',
      fontSize: '22px',
      flexShrink: 0,
    },
    button: {
      marginTop: '35px',
      width: '100%',
      padding: '14px',
      backgroundColor: '#0d3b66',
      color: 'white',
      fontSize: '18px',
      fontWeight: '700',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      boxShadow: '0 8px 15px rgba(13, 59, 102, 0.4)',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#062841',
      boxShadow: '0 10px 20px rgba(6, 40, 65, 0.6)',
    },
  };

  const [btnHover, setBtnHover] = useState(false);

  if (loading) {
    return (
      <div style={styles.outerWrapper}>
        <div style={styles.container}>
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#333' }}>Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.outerWrapper}>
        <div style={styles.container}>
          <p style={{ color: 'red', textAlign: 'center', fontSize: '18px' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Customer Dashboard</h2>

        <div style={styles.infoRow}>
          <FaUser style={styles.icon} />
          <span><strong>Welcome:</strong> {customer.f_name} {customer.l_name}</span>
        </div>

        <div style={styles.infoRow}>
          <FaEnvelope style={styles.icon} />
          <span><strong>Email:</strong> {customer.email}</span>
        </div>

        <div style={styles.infoRow}>
          <FaIdCard style={styles.icon} />
          <span><strong>NIC:</strong> {customer.nic}</span>
        </div>

        <div style={styles.infoRow}>
          <FaCarSide style={styles.icon} />
          <span><strong>Driving License:</strong> {customer.d_licen}</span>
        </div>

        <div style={styles.infoRow}>
          <FaPhone style={styles.icon} />
          <span><strong>Phone:</strong> {customer.tel_no}</span>
        </div>

        <div style={styles.infoRow}>
          <FaCalendarAlt style={styles.icon} />
          <span><strong>Registered on:</strong> {customer.reg_date}</span>
        </div>

        <button
          style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onClick={handleViewVehicles}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          View All Vehicles
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
