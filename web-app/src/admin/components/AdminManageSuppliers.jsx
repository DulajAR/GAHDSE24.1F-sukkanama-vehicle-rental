import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const AdminManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const navigate = useNavigate();

  const fetchSuppliers = async () => {
    try {
      const supplierCollection = collection(db, "suppliers");
      const supplierSnapshot = await getDocs(supplierCollection);
      const supplierList = supplierSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(supplierList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteDoc(doc(db, "suppliers", id));
        setSuppliers((prev) => prev.filter((s) => s.id !== id));
      } catch (err) {
        console.error("Error deleting supplier:", err);
      }
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  if (loading) return <p>Loading suppliers...</p>;

  return (
    <div className="supplier-table-container">
      <h2>Manage Suppliers</h2>

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

      {/* 🔍 Search Field */}
      <input
        type="text"
        placeholder="Search by email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "10px",
          width: "100%",
          maxWidth: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      />

      <div className="table-wrapper">
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>NIC</th>
              <th>Phone</th>
              <th>Reg. Date</th>
              <th>Tax ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan="7">No suppliers found.</td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.email}</td>
                  <td>{supplier.f_name} {supplier.l_name}</td>
                  <td>{supplier.nic}</td>
                  <td>{supplier.tel_no}</td>
                  <td>{supplier.reg_date}</td>
                  <td>{supplier.tax_id || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/suppliers/update/:id${supplier.id}`)}
                      style={{
                        color: "green",
                        marginRight: "10px",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                        fontWeight: "bold"
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                        fontWeight: "bold"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .supplier-table-container {
          max-width: 100%;
          margin: 50px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .table-wrapper {
          overflow-x: auto;
          overflow-y: auto;
          max-height: 500px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .supplier-table {
          width: 100%;
          min-width: 900px;
          border-collapse: collapse;
        }

        .supplier-table th, .supplier-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
          white-space: nowrap;
        }

        .supplier-table th {
          background-color: #f2f2f2;
          position: sticky;
          top: 0;
          z-index: 1;
        }

        .supplier-table button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AdminManageSuppliers;
