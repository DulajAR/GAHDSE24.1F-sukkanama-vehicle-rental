import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const AdminDetails = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const adminId = localStorage.getItem("admin");

      if (!adminId) {
        console.warn("Admin ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "admins", adminId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAdminData(docSnap.data());
        } else {
          console.error("No admin document found for ID:", adminId);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) return <p>Loading admin details...</p>;
  if (!adminData) return <p>No admin data found.</p>;

  const styles = {
    dashboard: {
      padding: "30px",
      maxWidth: "600px",
      margin: "40px auto",
      borderRadius: "12px",
      backgroundColor: "#f7f7f7",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
    },
    subHeading: {
      textAlign: "center",
      color: "#4CAF50",
      marginBottom: "30px",
    },
    detailText: {
      fontSize: "16px",
      margin: "10px 0",
      color: "#444",
    },
    strongText: {
      color: "#000",
    },
  };

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.heading}>Admin Details</h1>
      <h2 style={styles.subHeading}>
        Welcome, {adminData.f_name} {adminData.l_name}
      </h2>
      <div>
        <p style={styles.detailText}>
          <strong style={styles.strongText}>Email:</strong> {adminData.email}
        </p>
        <p style={styles.detailText}>
          <strong style={styles.strongText}>NIC:</strong> {adminData.nic}
        </p>
        <p style={styles.detailText}>
          <strong style={styles.strongText}>Phone:</strong> {adminData.tel_no}
        </p>
        <p style={styles.detailText}>
          <strong style={styles.strongText}>Registered on:</strong> {adminData.reg_date}
        </p>
        <p style={styles.detailText}>
          <strong style={styles.strongText}>User Type:</strong> {adminData.user_type}
        </p>
      </div>
    </div>
  );
};

export default AdminDetails;
