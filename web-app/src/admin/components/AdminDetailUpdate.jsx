import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AdminDetailUpdate = () => {
  const { id } = useParams(); // Get admin ID from route
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    f_name: "",
    l_name: "",
    nic: "",
    reg_date: "",
    tel_no: "",
    user_type: "admin",
  });

  const fetchAdmin = async () => {
    try {
      const adminRef = doc(db, "admins", id);
      const adminSnap = await getDoc(adminRef);
      if (adminSnap.exists()) {
        setAdmin(adminSnap.data());
      } else {
        alert("Admin not found!");
        navigate("/admin/settings");
      }
    } catch (err) {
      console.error("Error fetching admin:", err);
    }
  };

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "admins", id), admin);
      alert("Admin details updated successfully.");
      navigate("/admin/settings");
    } catch (err) {
      console.error("Error updating admin:", err);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [id]);

  return (
    <div className="admin-update-container">
      <h2>Update Admin Details</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="f_name"
          placeholder="First Name"
          value={admin.f_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="l_name"
          placeholder="Last Name"
          value={admin.l_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={admin.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tel_no"
          placeholder="Phone Number"
          value={admin.tel_no}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          value={admin.nic}
          onChange={handleChange}
          required
        />
        {/* Use date input for registration date */}
        <input
          type="date"
          name="reg_date"
          placeholder="Registration Date"
          value={admin.reg_date}
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button type="submit">Update Admin</button>
          <button
            type="button"
            onClick={() => navigate("/admin/settings")}
            style={{ backgroundColor: "#6c757d", marginLeft: "10px" }}
          >
            Back
          </button>
        </div>
      </form>

      <style>{`
        .admin-update-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          background: #f9f9f9;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .admin-form input {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .admin-form button {
          padding: 10px 20px;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .admin-form button[type="submit"] {
          background: #28a745;
        }

        .admin-form button[type="submit"]:hover {
          background: #218838;
        }

        .button-group {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 10px;
        }

        .button-group button[type="button"] {
          background: #6c757d;
        }

        .button-group button[type="button"]:hover {
          background: #5a6268;
        }
      `}</style>
    </div>
  );
};

export default AdminDetailUpdate;
