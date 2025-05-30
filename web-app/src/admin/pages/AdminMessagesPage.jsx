import React from "react";
import AdminHeader from "../components/AdminHeader"; // ✅ AdminHeader at the top
import AdminMessages from "../components/AdminMessages"; // ✅ Inbox messages
import AdminNewsletter from "../components/AdminNewsletter"; // ✅ Import newsletter subscribers

const AdminMessagesPage = () => {
  return (
    <>
      <AdminHeader />

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
        <AdminMessages />

        <hr style={{ margin: "40px 0", borderTop: "1px solid #ccc" }} />

        <h2>Newsletter Subscribers</h2>
        <AdminNewsletter /> {/* ✅ Newsletter list below messages */}
      </div>
    </>
  );
};

export default AdminMessagesPage;
