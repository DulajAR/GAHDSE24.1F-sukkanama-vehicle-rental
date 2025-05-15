// src/admin/components/AdminCustomerDetailUpdate.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const AdminCustomerDetailUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    f_name: "",
    l_name: "",
    email: "",
    nic: "",
    tel_no: "",
    d_licen: "", // Added driving license number field
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const docRef = doc(db, "customers", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCustomer(docSnap.data());
        } else {
          alert("Customer not found");
          navigate("/admin/manage-customers");
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
      }
    };
    fetchCustomer();
  }, [id, navigate]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerRef = doc(db, "customers", id);
      await updateDoc(customerRef, customer);
      alert("Customer updated successfully!");
      navigate("/admin/manage-customers");
    } catch (err) {
      console.error("Error updating customer:", err);
      alert("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update Customer</h2>

      <button
        style={styles.backButton}
        onClick={() => navigate("/admin/manage-customers")}
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="f_name"
          value={customer.f_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={styles.input}
        />
        <input
          name="l_name"
          value={customer.l_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          name="nic"
          value={customer.nic}
          onChange={handleChange}
          placeholder="NIC"
          required
          style={styles.input}
        />
        <input
          name="tel_no"
          value={customer.tel_no}
          onChange={handleChange}
          placeholder="Phone"
          required
          style={styles.input}
        />
        <input
          name="d_licen"
          value={customer.d_licen || ""}
          onChange={handleChange}
          placeholder="Driving License No"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Update
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

export default AdminCustomerDetailUpdate;
