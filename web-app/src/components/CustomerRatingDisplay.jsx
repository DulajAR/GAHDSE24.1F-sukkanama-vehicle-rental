import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // added useNavigate
import { db } from "../firebase-config"; // adjust path if needed
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function CustomerRatingDisplay() {
  const { bookingId } = useParams();
  const navigate = useNavigate();  // initialize navigate
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (!bookingSnap.exists()) {
          console.error("Booking not found");
          setLoading(false);
          return;
        }

        const bookingData = bookingSnap.data();
        const customerId = bookingData.customerId;

        if (!customerId) {
          console.error("Customer ID not found in booking");
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "ratings"),
          where("targetType", "==", "customer"),
          where("targetId", "==", customerId)
        );

        const querySnapshot = await getDocs(q);
        const ratingsList = [];
        let totalStars = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          ratingsList.push(data);
          totalStars += data.stars || 0;
        });

        setRatings(ratingsList);
        if (ratingsList.length > 0) {
          setAverageRating((totalStars / ratingsList.length).toFixed(1));
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [bookingId]);

  const renderStars = (count) => "⭐".repeat(count);

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "50px auto",
      padding: "40px",
      borderRadius: "20px",
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "300px",
    },
    backButton: {
      marginBottom: "30px",
      padding: "10px 20px",
      backgroundColor: "#0d3b66",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "16px",
    },
    title: {
      fontSize: "30px",
      fontWeight: "700",
      color: "#0d3b66",
      textAlign: "center",
      marginBottom: "20px",
    },
    average: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      textAlign: "center",
      marginBottom: "30px",
    },
    ratingBox: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "20px",
      boxShadow: "0 5px 10px rgba(0,0,0,0.05)",
      border: "1px solid #ccc",
    },
    ratingText: {
      fontSize: "16px",
      color: "#222",
      marginBottom: "10px",
    },
    commentText: {
      fontStyle: "italic",
      color: "#555",
    },
    noRatings: {
      textAlign: "center",
      fontSize: "16px",
      color: "#555",
      marginTop: "20px",
    },
    loadingText: {
      textAlign: "center",
      fontSize: "16px",
      color: "#777",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.backButton}
        onClick={() => navigate("/supplier-dashboard")}
      >
        ← Back to Dashboard
      </button>

      <h2 style={styles.title}>⭐ Customer Ratings</h2>
      <p style={styles.average}>
        Average Rating: {ratings.length > 0 ? `${averageRating} / 5` : "0 / 5"}
      </p>

      {loading ? (
        <p style={styles.loadingText}>Loading ratings...</p>
      ) : ratings.length === 0 ? (
        <p style={styles.noRatings}>No ratings available for this customer.</p>
      ) : (
        ratings.map((rating, index) => (
          <div key={index} style={styles.ratingBox}>
            <p style={styles.ratingText}>
              <strong>Stars:</strong> {renderStars(rating.stars)} ({rating.stars})
            </p>
            <p style={styles.commentText}>
              <strong>Comment:</strong> {rating.comment || "No comment provided"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerRatingDisplay;
