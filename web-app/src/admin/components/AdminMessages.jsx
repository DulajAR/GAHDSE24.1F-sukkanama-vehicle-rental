import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [emailFilter, setEmailFilter] = useState("");
  const [fromDateFilter, setFromDateFilter] = useState("");
  const [toDateFilter, setToDateFilter] = useState("");

  const fetchMessages = async () => {
    try {
      const messagesCollection = collection(db, "messages");
      const snapshot = await getDocs(messagesCollection);
      const messagesList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          status: data.status || "new",
          ...data,
        };
      });
      setMessages(messagesList);
      setFilteredMessages(messagesList);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "messages", id));
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        setFilteredMessages((prev) => prev.filter((msg) => msg.id !== id));
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "new" ? "read" : "new";
    try {
      const messageRef = doc(db, "messages", id);
      await updateDoc(messageRef, { status: newStatus });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        )
      );
      setFilteredMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    let filtered = [...messages];

    if (emailFilter.trim() !== "") {
      filtered = filtered.filter((msg) =>
        msg.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    if (fromDateFilter !== "") {
      const fromTimestamp = new Date(fromDateFilter).setHours(0, 0, 0, 0);
      filtered = filtered.filter((msg) => {
        if (!msg.createdAt) return false;
        const msgTime = msg.createdAt.toDate().getTime();
        return msgTime >= fromTimestamp;
      });
    }

    if (toDateFilter !== "") {
      const toTimestamp = new Date(toDateFilter).setHours(23, 59, 59, 999);
      filtered = filtered.filter((msg) => {
        if (!msg.createdAt) return false;
        const msgTime = msg.createdAt.toDate().getTime();
        return msgTime <= toTimestamp;
      });
    }

    setFilteredMessages(filtered);
  }, [emailFilter, fromDateFilter, toDateFilter, messages]);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-messages-container">
      <h2>Inbox Messages</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <label>
          From Date:{" "}
          <input
            type="date"
            value={fromDateFilter}
            onChange={(e) => setFromDateFilter(e.target.value)}
          />
        </label>
        <label>
          To Date:{" "}
          <input
            type="date"
            value={toDateFilter}
            onChange={(e) => setToDateFilter(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            setEmailFilter("");
            setFromDateFilter("");
            setToDateFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {filteredMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="messages-scroll-wrapper">
          <div className="messages-grid">
            {filteredMessages.map((msg) => (
              <div className="message-card" key={msg.id}>
                <h3>{msg.subject}</h3>
                <p>
                  <strong>From:</strong> {msg.name} ({msg.email})
                </p>
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
                <p>
                  <strong>Received:</strong>{" "}
                  {msg.createdAt?.toDate().toLocaleString() || "Unknown"}
                </p>

                <div className="action-buttons">
                  <button
                    onClick={() => toggleStatus(msg.id, msg.status || "new")}
                    className={`status-btn ${
                      msg.status === "read" ? "read" : "new"
                    }`}
                  >
                    {msg.status === "read" ? "Read" : "New"}
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                      msg.subject
                    )}&body=Hi ${msg.name},%0D%0A%0D%0A`}
                    className="reply-btn"
                  >
                    Reply
                  </a>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .admin-messages-container {
          max-width: 1200px;
          margin: 30px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .filters {
          margin-bottom: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          align-items: center;
        }

        .filters input[type="text"],
        .filters input[type="date"] {
          padding: 6px 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .filters button {
          background-color: #007bff;
          border: none;
          color: white;
          padding: 6px 15px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
        }

        .messages-scroll-wrapper {
          max-height: 800px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .messages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .message-card {
          background-color: #f9f9f9;
          border-left: 6px solid #007bff;
          padding: 15px 20px;
          border-radius: 8px;
          min-height: 180px;
          position: relative;
        }

        .message-card h3 {
          margin: 0 0 10px;
          color: #333;
        }

        .message-card p {
          margin: 5px 0;
          font-size: 14px;
          color: #555;
        }

        /* Highlight the labels "From:", "Message:", "Received:" */
        .message-card p strong {
          font-weight: 700;
          font-size: 15px;
          color: #222;
          margin-right: 6px;
          display: inline-block;
          min-width: 80px; /* Align labels vertically */
          /* Optional highlight background */
          background-color: #e0f0ff;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .status-btn {
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          text-transform: capitalize;
        }

        .status-btn.new {
          background-color: red;
          color: white;
        }

        .status-btn.read {
          background-color: yellow;
          color: black;
        }

        .reply-btn {
          background-color: #28a745;
          color: white;
          padding: 6px 12px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }

        .reply-btn:hover {
          background-color: #1e7e34;
        }

        .delete-btn {
          background-color: red;
          color: white;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 5px;
          font-weight: bold;
        }

        .delete-btn:hover {
          background-color: darkred;
        }

        @media (max-width: 768px) {
          .messages-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminMessages;
