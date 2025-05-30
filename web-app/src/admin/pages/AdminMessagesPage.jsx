import React from "react";
import AdminHeader from "../components/AdminHeader"; // ✅ Import the AdminHeader
import AdminMessages from "../components/AdminMessages";

const AdminMessagesPage = () => {
  return (
    <>
      <AdminHeader /> {/* ✅ AdminHeader at the top */}

      <div
        style={{
          paddingTop: "80px",
          minHeight: "100vh",
          backgroundColor: "#eef1f5",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h2>Inbox Messages</h2>
        <AdminMessages /> {/* ✅ Display messages here */}
      </div>
    </>
  );
};

export default AdminMessagesPage;
