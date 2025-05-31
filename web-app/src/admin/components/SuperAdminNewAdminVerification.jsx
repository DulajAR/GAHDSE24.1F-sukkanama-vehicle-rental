import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config"; // adjust path as needed
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const SuperAdminNewAdminVerification = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "admins"));
        const allAdmins = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.user_type === "admin") {
            allAdmins.push({ id: docSnap.id, ...data });
          }
        });
        setAdmins(allAdmins);
      } catch (err) {
        console.error("Error fetching admins:", err);
      }
    };

    fetchAdmins();
  }, []);

  const handleApprove = async (id) => {
    await updateDoc(doc(db, "admins", id), { status: "approved" });
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id ? { ...admin, status: "approved" } : admin
      )
    );
  };

  const handleReject = async (id) => {
    await deleteDoc(doc(db, "admins", id));
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  const handleHold = async (id) => {
    await updateDoc(doc(db, "admins", id), { status: "hold" });
    setAdmins((prev) =>
      prev.map((admin) => (admin.id === id ? { ...admin, status: "hold" } : admin))
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧾 Admin Requests & Status</h2>
      {admins.length === 0 ? (
        <p>No admin records found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {admins.map((admin) => (
            <li
              key={admin.id}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                padding: "1rem",
                backgroundColor:
                  admin.status === "hold"
                    ? "#f8d7da"
                    : admin.status === "pending"
                    ? "#fff3cd"
                    : "#d4edda",
              }}
            >
              <p>
                <strong>Name:</strong> {admin.f_name} {admin.l_name}{" "}
                {admin.status === "hold" && (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    (Temporarily Blocked)
                  </span>
                )}
                {admin.status === "pending" && (
                  <span style={{ color: "#856404", fontWeight: "bold" }}>
                    (Pending Approval)
                  </span>
                )}
                {admin.status === "approved" && (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    (Approved)
                  </span>
                )}
              </p>
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>NIC:</strong> {admin.nic}</p>
              <p><strong>Phone:</strong> {admin.tel_no}</p>
              <p><strong>Reg Date:</strong> {admin.reg_date}</p>

              <div>
                {admin.status !== "approved" && (
                  <button
                    onClick={() => handleApprove(admin.id)}
                    style={{
                      marginRight: "1rem",
                      background: "green",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                )}

                {admin.status !== "hold" && (
                  <button
                    onClick={() => handleHold(admin.id)}
                    style={{
                      marginRight: "1rem",
                      background: "orange",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Hold
                  </button>
                )}

                <button
                  onClick={() => handleReject(admin.id)}
                  style={{
                    background: "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuperAdminNewAdminVerification;
