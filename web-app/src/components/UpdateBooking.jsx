import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const UpdateBooking = ({ bookingId }) => {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      const bookingRef = doc(db, "bookings", bookingId);
      const bookingSnap = await getDoc(bookingRef);
      if (bookingSnap.exists()) {
        const data = bookingSnap.data();
        setBookingData(data);
        setForm({
          startDate: data.startDate,
          endDate: data.endDate,
          phone: data.phone,
        });
      }
      setLoading(false);
    };

    fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      startDate: form.startDate,
      endDate: form.endDate,
      phone: form.phone,
    });
    alert("✅ Booking updated successfully!");
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading booking...</p>;
  }

  if (!bookingData) {
    return <p className="text-center text-red-600">❌ Booking not found.</p>;
  }

  return (
    <div className="update-container">
      <form onSubmit={handleUpdate} className="update-form">
        <button type="button" onClick={handleBack} className="back-button">
          &#x2190; Back
        </button>

        <h2>Update Vehicle Booking</h2>

        <label>Pick-up Date:</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <label>Drop-off Date:</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <label>Contact Number:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="e.g. 0771234567"
        />

        <button type="submit" className="submit-button">
          Update Booking
        </button>
      </form>

      <style jsx>{`
        .update-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .update-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        h2 {
          text-align: center;
          color: #1a7f37;
        }

        label {
          font-weight: 600;
        }

        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
        }

        .back-button {
          margin-bottom: 10px;
          background: none;
          border: none;
          color: #1a73e8;
          font-weight: bold;
          cursor: pointer;
        }

        .submit-button {
          padding: 12px;
          background-color: #1a7f37;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
        }

        .submit-button:hover {
          background-color: #166c2e;
        }
      `}</style>
    </div>
  );
};

export default UpdateBooking;