// src/components/admin/AdminManageCustomers.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate

const AdminManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // <-- initialize navigate

  const fetchCustomers = async () => {
    try {
      const customerCollection = collection(db, "customers");
      const customerSnapshot = await getDocs(customerCollection);
      const customerList = customerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteDoc(doc(db, "customers", id));
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;

  return (
    <div className="customer-table-container">
      <h2>Manage Customers</h2>

      {/* Back button */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        style={{
          marginBottom: "15px",
          padding: "8px 15px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        &larr; Back to Dashboard
      </button>

      <table className="customer-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>NIC</th>
            <th>Phone</th>
            <th>Reg. Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="6">No customers found.</td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.email}</td>
                <td>{customer.f_name} {customer.l_name}</td>
                <td>{customer.nic}</td>
                <td>{customer.tel_no}</td>
                <td>{customer.reg_date}</td>
                <td>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <style>{`
        .customer-table-container {
          max-width: 1000px;
          margin: 50px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .customer-table {
          width: 100%;
          border-collapse: collapse;
        }

        .customer-table th, .customer-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }

        .customer-table th {
          background-color: #f2f2f2;
        }

        .customer-table button {
          padding: 5px 10px;
          border: none;
          background-color: transparent;
          cursor: pointer;
          font-weight: bold;
        }

        .customer-table button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AdminManageCustomers;
