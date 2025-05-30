import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  where,
  Timestamp,
} from "firebase/firestore";

const AdminNewsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    let q = collection(db, "newsletters");

    if (fromDate && toDate) {
      const from = Timestamp.fromDate(new Date(fromDate));
      const to = Timestamp.fromDate(
        new Date(new Date(toDate).setHours(23, 59, 59, 999))
      ); // Include whole 'to' day
      q = query(q, where("subscribedAt", ">=", from), where("subscribedAt", "<=", to));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsletterList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsletters(newsletterList);
    });

    return () => unsubscribe();
  }, [fromDate, toDate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subscriber?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "newsletters", id));
      alert("Subscriber deleted successfully.");
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Failed to delete subscriber.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Newsletter Subscribers</h2>

      {/* Date Filter Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div>
          <label style={{ marginRight: "8px" }}>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: "8px" }}>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setFromDate("");
            setToDate("");
          }}
          style={{
            backgroundColor: "#777",
            color: "#fff",
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Table of Subscribers */}
      {newsletters.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <div
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "400px",
            }}
          >
            <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0 }}>
              <tr>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Subscribed At</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {newsletters.map((entry) => (
                <tr key={entry.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={styles.td}>{entry.email}</td>
                  <td style={styles.td}>
                    {entry.subscribedAt?.toDate().toLocaleString() || "N/A"}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => {
                        window.location.href = `mailto:${entry.email}?subject=Newsletter&body=Hello,`;
                      }}
                      style={styles.mailButton}
                    >
                      Send Mail
                    </button>

                    <button
                      onClick={() => handleDelete(entry.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  th: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    borderBottom: "1px solid #ccc",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    verticalAlign: "middle",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "8px",
  },
  mailButton: {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminNewsletter;
