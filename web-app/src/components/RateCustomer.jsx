import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

const RateCustomer = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingRef = doc(db, 'bookings', bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (bookingSnap.exists()) {
          setBookingData(bookingSnap.data());
        } else {
          alert("Booking not found!");
        }
      } catch (error) {
        alert("Error fetching booking: " + error.message);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  const submitRating = async () => {
    if (stars < 1 || stars > 5) return alert("Please select a rating between 1 and 5");
    if (!bookingData) return alert("Booking data not loaded yet.");

    try {
      await addDoc(collection(db, "ratings"), {
        raterId: bookingData.vehicleOwnerId,   // supplier ID
        raterType: "supplier",
        targetId: bookingData.customerId,      // customer ID
        targetType: "customer",
        stars,
        comment,
        bookingId: bookingId,
        timestamp: serverTimestamp(),
      });
      alert("Rating submitted successfully!");
      setStars(0);
      setComment('');
    } catch (err) {
      alert("Error submitting rating: " + err.message);
    }
  };

  const styles = {
    container: {
      maxWidth: "520px",
      margin: "60px auto",
      background: "linear-gradient(135deg, #FDEB71 0%, #F8D800 100%)",
      borderRadius: "20px",
      padding: "40px 30px",
      boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      textAlign: "center",
      color: "#333",
      marginBottom: "25px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      fontSize: "16px",
    },
    input: {
      width: "90%",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "12px",
      border: "1.5px solid #888",
      outline: "none",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
    },
    textarea: {
      width: "90%",
      padding: "12px",
      fontSize: "15px",
      borderRadius: "12px",
      border: "1.5px solid #888",
      resize: "vertical",
      minHeight: "100px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "14px",
      fontSize: "17px",
      fontWeight: "700",
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "15px",
      cursor: "pointer",
      boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#000",
      boxShadow: "0 12px 20px rgba(0,0,0,0.4)",
    },
    backButton: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "600",
      backgroundColor: "#bbb",
      color: "#000",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      marginBottom: "25px",
      boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    },
    loadingText: {
      textAlign: "center",
      color: "#555",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⭐ Rate Your Customer</h2>

      <button
        onClick={() => navigate("/supplier-dashboard")}
        style={styles.backButton}
      >
        ← Back to Dashboard
      </button>

      {!bookingData ? (
        <p style={styles.loadingText}>Loading booking data...</p>
      ) : (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Stars (1 to 5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={stars}
              onChange={e => setStars(Number(e.target.value))}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Comment (optional):</label>
            <textarea
              placeholder="Optional comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              style={styles.textarea}
            />
          </div>

          <button
            onClick={submitRating}
            style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            Submit Rating
          </button>
        </>
      )}
    </div>
  );
};

export default RateCustomer;
