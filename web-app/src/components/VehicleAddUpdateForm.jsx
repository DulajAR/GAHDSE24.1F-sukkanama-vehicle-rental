import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
const auth = getAuth(app);

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const VehicleAddUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [message, setMessage] = useState("");
  const [vehicleImage, setVehicleImage] = useState(null);
  const [view360Image, setView360Image] = useState(null);

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
    vehicleImageUrl: "",
    view360ImageUrl: "",
  });

  // Fetch user and supplier ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        const q = query(
          collection(db, "suppliers"),
          where("email", "==", currentUser.email)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setSupplierId(snapshot.docs[0].id);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch existing vehicle details if editing
  useEffect(() => {
    const fetchVehicle = async () => {
      if (id) {
        const docRef = doc(db, "vehicles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...data,
            yom: data.yom ? String(data.yom) : "",
          });
        } else {
          setMessage("❌ Vehicle not found.");
        }
      }
    };
    fetchVehicle();
  }, [id]);

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

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vehicleImageUrl = vehicleImage
        ? await uploadToCloudinary(vehicleImage)
        : formData.vehicleImageUrl || "";

      const view360ImageUrl = view360Image
        ? await uploadToCloudinary(view360Image)
        : formData.view360ImageUrl || "";

      const vehicleData = {
        ...formData,
        yom: parseInt(formData.yom),
        vehicleImageUrl,
        view360ImageUrl,
        userId: supplierId,
        userEmail: user.email,
      };

      if (id) {
        const docRef = doc(db, "vehicles", id);
        await updateDoc(docRef, vehicleData);
        setMessage("✅ Vehicle updated successfully!");
      } else {
        await addDoc(collection(db, "vehicles"), {
          ...vehicleData,
          createdAt: new Date(),
        });
        setMessage("✅ Vehicle added successfully!");
      }

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
        vehicleImageUrl: "",
        view360ImageUrl: "",
      });
      setVehicleImage(null);
      setView360Image(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit vehicle data.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem", backgroundColor: "#fff", borderRadius: "10px" }}>
      <button onClick={() => navigate("/supplier-dashboard")} style={{ marginBottom: "1rem" }}>
        ⬅ Back to Dashboard
      </button>

      <h2 style={{ textAlign: "center" }}>
        {id ? "✏️ Update Vehicle" : "🚗 Add Vehicle"}
      </h2>

      {message && (
        <p style={{ textAlign: "center", color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input name="plate" placeholder="Plate Number" value={formData.plate} onChange={handleChange} required />
        <input name="eng_capacity" placeholder="Engine Capacity" value={formData.eng_capacity} onChange={handleChange} required />
        <select name="t_mission" value={formData.t_mission} onChange={handleChange} required>
          <option value="">Select Transmission</option>
          <option value="Auto">Auto</option>
          <option value="Manual">Manual</option>
        </select>
        <select name="brand" value={formData.brand} onChange={handleChange} required>
          <option value="">Select Brand</option>
          {["Audi", "BMW", "Daihatsu", "Dimo", "Ford", "Honda", "Hyundai", "Isuzu", "Jeep", "KIA", "Mazda", "Benze", "Mitsubishi", "Nissan", "Perodua", "Suzuki", "Toyota", "Micro"].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <input name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
        <select name="no_of_doors" value={formData.no_of_doors} onChange={handleChange} required>
          <option value="">Number of Doors</option>
          {[1, 2, 3, 4, 5].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select name="f_type" value={formData.f_type} onChange={handleChange} required>
          <option value="">Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>
        <input
          type="number"
          name="yom"
          placeholder="Year of Manufacture"
          value={formData.yom}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
          required
        />
        <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
        <input name="seat_capacity" type="number" placeholder="Seats" value={formData.seat_capacity} onChange={handleChange} required />
        <div>
          <input name="per_day_chrg" type="number" placeholder="Per Day Charge" value={formData.per_day_chrg} onChange={handleChange} />
          <button type="button" onClick={handleChargeIncrease}>+ Rs.500</button>
        </div>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <label>Upload Vehicle Image</label>
        <input type="file" accept="image/*" onChange={(e) => setVehicleImage(e.target.files[0])} />
        <label>Upload 360° View Image</label>
        <input type="file" accept="image/*" onChange={(e) => setView360Image(e.target.files[0])} />
        <button type="submit">{id ? "Update Vehicle" : "Add Vehicle"}</button>
      </form>
    </div>
  );
};

export default VehicleAddUpdateForm;