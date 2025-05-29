import React, { useState } from 'react';
import { db } from '../firebase-config'; // Make sure your firebase config is here
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await addDoc(collection(db, 'newsletters'), {
        email: email,
        subscribedAt: serverTimestamp(),
      });

      alert('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter: ', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section id="newsletter" className="section-p1 section-m1">
      <div className="newstext">
        <h2>Subscribe to Newsletter</h2>
        <p>Sign up to get the latest updates</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="normal">Sign Up</button>
      </form>
    </section>
  );
};

export default Newsletter;
