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
        className="back-button"
      >
        &larr; Back to Dashboard
      </button>

      <input
        type="text"
        placeholder="Search by email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="search-input"
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
                  <td>
                    {supplier.f_name} {supplier.l_name}
                  </td>
                  <td>{supplier.nic}</td>
                  <td>{supplier.tel_no}</td>
                  <td>{supplier.reg_date}</td>
                  <td>{supplier.tax_id || "N/A"}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/suppliers/update/${supplier.id}`)
                      }
                      className="action-btn update"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="action-btn delete"
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
          max-width: 1000px;
          margin: 50px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .back-button {
          margin-bottom: 15px;
          padding: 8px 15px;
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
        }

        .search-input {
          margin-bottom: 15px;
          padding: 10px;
          width: 100%;
          max-width: 300px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

     .table-wrapper {
  overflow-y: auto;
  max-height: 450px; /* Show about 10 rows */
  border: 1px solid #ddd;
  border-radius: 8px;
}


        .supplier-table {
          width: 100%;
          border-collapse: collapse;
        }

        .supplier-table th,
        .supplier-table td {
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

        .action-btn {
          background-color: transparent;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .action-btn.update {
          color: orange;
          margin-right: 10px;
        }

        .action-btn.delete {
          color: red;
        }

        .action-btn:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .supplier-table-container {
            padding: 10px;
          }

          .supplier-table th,
          .supplier-table td {
            padding: 8px;
            font-size: 12px;
          }

          .search-input {
            width: 100%;
          }

          .supplier-table-container h2 {
            font-size: 20px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminManageSuppliers;
