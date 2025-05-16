import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const AdminSupplierDetailUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    f_name: "",
    l_name: "",
    email: "",
    nic: "",
    reg_date: "",
    tax_id: "",
    tel_no: "",
    user_type: "supplier",
  });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const docRef = doc(db, "suppliers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSupplier(docSnap.data());
        } else {
          alert("Supplier not found");
          navigate("/admin/manage-suppliers");
        }
      } catch (err) {
        console.error("Error fetching supplier:", err);
      }
    };
    fetchSupplier();
  }, [id, navigate]);

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const supplierRef = doc(db, "suppliers", id);
      await updateDoc(supplierRef, supplier);
      alert("Supplier updated successfully!");
      navigate("/admin/manage-suppliers");
    } catch (err) {
      console.error("Error updating supplier:", err);
      alert("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update Supplier Details</h2>

      <button
        style={styles.backButton}
        onClick={() => navigate("/admin/manage-suppliers")}
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="f_name"
          value={supplier.f_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={styles.input}
        />
        <input
          name="l_name"
          value={supplier.l_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          value={supplier.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          name="nic"
          value={supplier.nic}
          onChange={handleChange}
          placeholder="NIC"
          required
          style={styles.input}
        />
        <input
          name="reg_date"
          type="date"
          value={supplier.reg_date}
          onChange={handleChange}
          placeholder="Registration Date"
          required
          style={styles.input}
        />
        <input
          name="tax_id"
          value={supplier.tax_id}
          onChange={handleChange}
          placeholder="Tax ID"
          style={styles.input}
        />
        <input
          name="tel_no"
          value={supplier.tel_no}
          onChange={handleChange}
          placeholder="Telephone"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Update Supplier
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  backButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AdminSupplierDetailUpdate;
