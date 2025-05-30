import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import logo from "../../assets/logo.png";

// Initialize Firestore outside of the component, assuming Firebase app is initialized elsewhere
const db = getFirestore();

const AdminHeader = () => {
  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Reference to messages collection
    const messagesRef = collection(db, "messages");

    // Listen to all messages (no query filter, because we want to detect missing status field)
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      // Filter docs with missing "status" field
      const countMissingStatus = snapshot.docs.filter(
        (doc) => !doc.data().hasOwnProperty("status")
      ).length;

      setUnreadCount(countMissingStatus);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <header
      id="header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#f5f7fa",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="admin-header-left"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={logo}
          className="logo"
          alt="Sukkanama Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <h1 style={{ fontSize: "1.5rem", color: "#333", margin: 0 }}>
          Sukkanama Admin Dashboard
        </h1>
      </div>

      <nav>
        <ul
          id="navbar"
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
            gap: "20px",
          }}
        >
          <li>
            <a
              href="/admin/dashboard"
              style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}
            >
              🏠 Home
            </a>
          </li>
          <li>
            <a
              href="/admin/manage-suppliers"
              style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}
            >
              📦 Supplier/Vehicles
            </a>
          </li>
          <li>
            <a
              href="/admin/manage-customers"
              style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}
            >
              🧑‍💼 Customer/Bookings
            </a>
          </li>
          <li>
            <a
              href="/admin-view-all-ratings"
              style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}
            >
              ⭐️ Ratings
            </a>
          </li>
          <li>
            <a
              href="/admin/settings"
              style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}
            >
              ⚙ Settings
            </a>
          </li>

          {/* Notification Icon */}
          <li
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/admin/messages")}
            title="View Messages"
          >
            {/* Bell Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: 28, height: 28, color: "#333" }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {/* Unread count badge */}
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#e02424",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "700",
                  minWidth: "20px",
                  textAlign: "center",
                  lineHeight: "1",
                  boxShadow: "0 0 3px rgba(0,0,0,0.2)",
                }}
              >
                {unreadCount}
              </span>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
