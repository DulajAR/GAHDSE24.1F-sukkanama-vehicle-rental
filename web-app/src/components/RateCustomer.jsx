import { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const RateCustomer = ({ customerId, supplierId }) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');

  const submitRating = async () => {
    if (stars < 1 || stars > 5) return alert("Please select a rating between 1 and 5");

    try {
      await addDoc(collection(db, "ratings"), {
        raterId: supplierId,
        raterType: "supplier",
        targetId: customerId,
        targetType: "customer",
        stars,
        comment,
        timestamp: serverTimestamp(),
      });
      alert("Rating submitted successfully!");
      setStars(0);
      setComment('');
    } catch (err) {
      alert("Error submitting rating: " + err.message);
    }
  };

  return (
    <div>
      <h2>Rate Your Customer</h2>
      <label>Stars (1-5): </label>
      <input type="number" min="1" max="5" value={stars} onChange={e => setStars(Number(e.target.value))} /><br />
      <textarea placeholder="Optional comment..." value={comment} onChange={e => setComment(e.target.value)} /><br />
      <button onClick={submitRating}>Submit Rating</button>
    </div>
  );
};

export default RateCustomer;
