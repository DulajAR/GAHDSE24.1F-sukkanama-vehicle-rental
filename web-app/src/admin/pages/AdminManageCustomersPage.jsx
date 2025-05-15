// src/pages/AdminManageCustomersPage.jsx
import AdminHeader from "../components/AdminHeader";
import AdminManageCustomers from "../components/AdminManageCustomers";

const AdminManageCustomersPage = () => {
  return (
    <div>
      {/* Container fixed at the top to hold header and title */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          paddingBottom: "10px",
        }}
      >
        <AdminHeader />
        <h1
          style={{
            textAlign: "center",
            margin: "10px 0",
            fontWeight: "bold",
          }}
        >
          Customer Management
        </h1>
         {/* Content with padding-top equal to header + heading height */}
        <div style={{ paddingTop: "140px" /* adjust as needed */, maxWidth: "1000px", margin: "0 auto" }}>
        <AdminManageCustomers />
      </div>
      </div>

     
      
    </div>
  );
};

export default AdminManageCustomersPage;
