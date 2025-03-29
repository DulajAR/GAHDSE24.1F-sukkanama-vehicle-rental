import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async (userEmail) => {
      try {
        const q = query(collection(db, "customers"), where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setCustomer(querySnapshot.docs[0].data());
        } else {
          console.log("No customer data found.");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Check authentication state and fetch customer data
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCustomerData(user.email);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!customer) return <p>No customer data found.</p>;

  return (
    <div className="customer-dashboard">
        <h1>Customer Dashboard</h1>
      <h2>Welcome, {customer.f_name} {customer.l_name}</h2>
      <div className="customer-details">
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>NIC:</strong> {customer.nic}</p>
        <p><strong>Driving License:</strong> {customer.d_licen}</p>
        <p><strong>Phone:</strong> {customer.tel_no}</p>
        <p><strong>Registered on:</strong> {customer.reg_date}</p>
      </div>
    </div>
  );
};

export default CustomerDashboard;