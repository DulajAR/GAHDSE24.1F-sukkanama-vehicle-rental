import { useState } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Firebase Config (Using Vite environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Firebase Initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const VehicleRegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    plate: "",
    eng_capacity: "",
    t_mission: "",
    brand: "",
    model: "",
    no_of_doors: "",
    f_type: "",
    yom: "",
    color: "",
    seat_capacity: "",
    per_day_chrg: "",
    description: "",
  });

  const [vehicleImage, setVehicleImage] = useState(null);
  const [view360Image, setView360Image] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChargeIncrease = () => {
    setFormData((prev) => ({
      ...prev,
      per_day_chrg: Number(prev.per_day_chrg || 0) + 500,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let vehicleImageUrl = "";
      let view360ImageUrl = "";

      if (vehicleImage) {
        const imgRef = ref(storage, `vehicles/images/${vehicleImage.name}`);
        await uploadBytes(imgRef, vehicleImage);
        vehicleImageUrl = await getDownloadURL(imgRef);
      }

      if (view360Image) {
        const viewRef = ref(storage, `vehicles/360/${view360Image.name}`);
        await uploadBytes(viewRef, view360Image);
        view360ImageUrl = await getDownloadURL(viewRef);
      }

      await addDoc(collection(db, "vehicles"), {
        ...formData,
        vehicleImageUrl,
        view360ImageUrl,
        createdAt: new Date(),
      });

      setMessage("✅ Vehicle Registered Successfully!");

      // Reset form
      setFormData({
        plate: "",
        eng_capacity: "",
        t_mission: "",
        brand: "",
        model: "",
        no_of_doors: "",
        f_type: "",
        yom: "",
        color: "",
        seat_capacity: "",
        per_day_chrg: "",
        description: "",
      });
      setVehicleImage(null);
      setView360Image(null);
    } catch (err) {
      console.error("Registration Error: ", err);
      setMessage("❌ Error: Could not register vehicle.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "95%",
        width: "800px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/supplier-dashboard")}
        style={{
          backgroundColor: "#6c757d",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        ⬅️ Back to Dashboard
      </button>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
        }}
      >
        🚗 Vehicle Registration
      </h2>

      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {[
          { name: "plate", type: "text", placeholder: "Plate Number" },
          { name: "eng_capacity", type: "text", placeholder: "Engine Capacity" },
        ].map(({ name, type, placeholder }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        ))}

        <select
          name="t_mission"
          onChange={handleChange}
          value={formData.t_mission}
          required
        >
          <option value="">Select Transmission</option>
          <option value="Auto">Auto</option>
          <option value="Manual">Manual</option>
        </select>

        <select
          name="brand"
          onChange={handleChange}
          value={formData.brand}
          required
        >
          <option value="">Select Brand</option>
          {[
            "Audi", "BMW", "Daihatsu", "Dimo", "Ford", "Honda", "Hyundai",
            "Isuzu", "Jeep", "KIA", "Mazda", "Benze", "Mitsubishi", "Nissan",
            "Perodua", "Suzuki", "Toyota", "Micro",
          ].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="model"
          placeholder="Model"
          onChange={handleChange}
          value={formData.model}
          required
        />

        <select
          name="no_of_doors"
          onChange={handleChange}
          value={formData.no_of_doors}
          required
        >
          <option value="">Select Number of Doors</option>
          {[1, 2, 3, 4, 5].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          name="f_type"
          onChange={handleChange}
          value={formData.f_type}
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        <input
          type="date"
          name="yom"
          onChange={handleChange}
          value={formData.yom}
          required
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          onChange={handleChange}
          value={formData.color}
          required
        />

        <input
          type="number"
          name="seat_capacity"
          placeholder="Seat Capacity"
          onChange={handleChange}
          value={formData.seat_capacity}
          required
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="number"
            name="per_day_chrg"
            placeholder="Per Day Charge (Rs.)"
            onChange={handleChange}
            value={formData.per_day_chrg}
            required
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={handleChargeIncrease}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
            }}
          >
            + Rs.500
          </button>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          required
          style={{
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minHeight: "80px",
          }}
        />

        <div>
          <label>Upload Vehicle Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setVehicleImage(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label>Upload 360 View Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setView360Image(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "0.75rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
           Register Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleRegistrationForm;