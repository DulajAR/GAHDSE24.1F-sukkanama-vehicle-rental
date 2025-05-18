import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

const SupplierRatingDisplay = ({ supplierId }) => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      if (!supplierId) return;

      try {
        const q = query(
          collection(db, "ratings"),
          where("targetId", "==", supplierId),
          where("targetType", "==", "supplier")
        );

        const querySnapshot = await getDocs(q);
        const allRatings = [];
        let totalStars = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allRatings.push(data);
          totalStars += data.stars;
        });

        const sortedRatings = allRatings.sort((a, b) => {
          const aTime = a.timestamp?.toDate?.() ?? new Date(0);
          const bTime = b.timestamp?.toDate?.() ?? new Date(0);
          return bTime - aTime;
        });

        setRatings(sortedRatings);
        setAverageRating(
          sortedRatings.length > 0
            ? (totalStars / sortedRatings.length).toFixed(1)
            : 0
        );
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [supplierId]);

  const renderStars = (count) => {
    return "⭐".repeat(count);
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '50px auto',
      padding: '40px',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      boxShadow: '0 15px 25px rgba(0,0,0,0.2)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    backButton: {
      marginBottom: '20px',
      padding: '10px 20px',
      backgroundColor: '#0d3b66',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600'
    },
    title: {
      fontSize: '30px',
      fontWeight: '700',
      color: '#0d3b66',
      textAlign: 'center',
      marginBottom: '20px',
    },
    average: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginBottom: '30px',
    },
    ratingBox: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '20px',
      boxShadow: '0 5px 10px rgba(0,0,0,0.05)',
      border: '1px solid #ccc',
    },
    ratingText: {
      fontSize: '16px',
      color: '#222',
      marginBottom: '10px',
    },
    commentText: {
      fontStyle: 'italic',
      color: '#555',
    },
    dateText: {
      fontSize: '12px',
      color: '#999',
      textAlign: 'right',
      marginTop: '10px',
    },
    noRatings: {
      textAlign: 'center',
      fontSize: '16px',
      color: '#555',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/all-vehicles")}>
        ← Back to All Vehicles
      </button>

      <h2 style={styles.title}>⭐ Supplier Ratings</h2>
      <p style={styles.average}>Average Rating: {averageRating} / 5</p>

      {ratings.length === 0 ? (
        <p style={styles.noRatings}>No ratings available.</p>
      ) : (
        ratings.map((rating, index) => (
          <div key={index} style={styles.ratingBox}>
            <p style={styles.ratingText}>
              <strong>Stars:</strong> {renderStars(rating.stars)} ({rating.stars})
            </p>
            {rating.comment && (
              <p style={styles.commentText}>
                <strong>Comment:</strong> {rating.comment}
              </p>
            )}
            <p style={styles.dateText}>
              {rating.timestamp?.toDate?.() instanceof Date
                ? rating.timestamp.toDate().toLocaleString()
                : "Date: N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default SupplierRatingDisplay;
