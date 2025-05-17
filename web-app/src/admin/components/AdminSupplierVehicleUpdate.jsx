import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AdminSupplierVehicleUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [vehicleImage, setVehicleImage] = useState(null);
  const [view360Image, setView360Image] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    plate: "",
    brand: "",
    model: "",
    yom: "",
    color: "",
    f_type: "",
    seat_capacity: "",
    no_of_doors: "",
    per_day_chrg: "",
    t_mission: "",
    description: "",
    vehicleImageUrl: "",
    view360ImageUrl: "",
    eng_capacity: "",
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const docRef = doc(db, "vehicles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          delete data.userEmail; // Remove userEmail if it exists
          setFormData({
            ...data,
            yom: String(data.yom || ""),
            per_day_chrg: String(data.per_day_chrg || ""),
          });
        } else {
          setMessage("❌ Vehicle not found.");
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        setMessage("❌ Error loading vehicle.");
      }
    };

    if (id) fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const vehicleImageUrl = vehicleImage
        ? await uploadToCloudinary(vehicleImage)
        : formData.vehicleImageUrl;

      const view360ImageUrl = view360Image
        ? await uploadToCloudinary(view360Image)
        : formData.view360ImageUrl;

      const updatedData = {
        ...formData,
        yom: parseInt(formData.yom),
        per_day_chrg: parseFloat(formData.per_day_chrg),
        vehicleImageUrl,
        view360ImageUrl,
      };

      const docRef = doc(db, "vehicles", id);
      await updateDoc(docRef, updatedData);

      setMessage("✅ Vehicle updated successfully!");
      setTimeout(() => navigate("/admin/manage-suppliers"), 2000); // Changed route to /admin/vehicles (was /admin/manage-suppliers)
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setMessage("❌ Failed to update vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <button
        onClick={() => navigate("/admin/manage-suppliers")} // Changed to /admin/vehicles to be consistent
        style={{ marginBottom: "1rem" }}
      >
        ⬅ Back to Vehicles
      </button>

      <h2 style={{ textAlign: "center" }}>✏️ Update Vehicle</h2>

      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {Object.entries(formData).map(([key, value]) => {
          if (
            [
              "userId",
              "createdAt",
              "availability",
              "vehicleImageUrl",
              "view360ImageUrl",
              "userEmail",
            ].includes(key)
          )
            return null;

          if (key === "brand") {
            return (
              <select
                key={key}
                name={key}
                value={value}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                <option value="Toyota">Toyota</option>
                <option value="Nissan">Nissan</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Hyundai">Hyundai</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Kia">Kia</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Audi">Audi</option>
                <option value="Dimo">Dimo</option>
                <option value="Ford">Ford</option>
                <option value="Isuzu">Isuzu</option>
                <option value="Jeep">Jeep</option>
                <option value="Mazda">Mazda</option>
                <option value="Benze">Benze</option>
                <option value="Perodua">Perodua</option>
                <option value="Micro">Micro</option>
              </select>
            );
          }

          if (key === "f_type") {
            return (
              <select
                key={key}
                name={key}
                value={value}
                onChange={handleChange}
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            );
          }

          if (key === "t_mission") {
            return (
              <select
                key={key}
                name={key}
                value={value}
                onChange={handleChange}
                required
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            );
          }

          // For all other fields (including color as manual input)
          return (
            <input
              key={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.replace(/_/g, " ")}
              type={
                key === "per_day_chrg" || key === "yom" || key === "eng_capacity"
                  ? "number"
                  : "text"
              }
              min={key === "per_day_chrg" ? "0" : key === "yom" ? "1900" : undefined}
              step={key === "per_day_chrg" ? "0.01" : "1"}
              required
            />
          );
        })}

        <label>Upload Vehicle Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setVehicleImage(e.target.files[0])}
        />

        <label>Upload 360 View Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setView360Image(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px",
            backgroundColor: isSubmitting ? "#6c757d" : "#007bff",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Updating..." : "Update Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AdminSupplierVehicleUpdate;
