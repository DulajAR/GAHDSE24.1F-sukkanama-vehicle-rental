import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Full component with internal styling
const BookNow = ({ vehicleId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const bookingData = {
      vehicleId,
      startDate,
      endDate,
      phone,
    };

    try {
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setMessage('Booking confirmed!');
        setStartDate('');
        setEndDate('');
        setPhone('');
      } else {
        setMessage('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">
        {/* Back Button */}
        <button type="button" onClick={handleBack} className="back-button">
          &#x2190; Back
        </button>

        <h3>Book This Vehicle</h3>

        {message && <p className="booking-message">{message}</p>}

        <input type="hidden" name="vehicleId" value={vehicleId} />

        <label>Pick-up Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>Drop-off Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <label>Contact Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 0771234567"
          required
        />

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>

      {/* Styles */}
      <style jsx>{`
        /* Global Styles */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
        }

        /* Booking Container */
        .booking-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        /* Form Styles */
        .booking-form {
          display: flex;
          flex-direction: column;
        }

        .booking-form h3 {
          font-size: 24px;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        .booking-form label {
          margin-bottom: 8px;
          font-size: 16px;
          color: #333;
        }

        .booking-form input {
          padding: 10px;
          margin-bottom: 15px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: none;
        }

        .booking-form input:focus {
          border-color: #007BFF;
        }

        .booking-form .submit-button {
          padding: 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .booking-form .submit-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .booking-form .submit-button:hover:not(:disabled) {
          background-color: #218838;
        }

        /* Back Button */
        .back-button {
          background-color: transparent;
          border: none;
          color: #007BFF;
          font-size: 16px;
          margin-bottom: 20px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .back-button:hover {
          color: #0056b3;
        }

        .booking-message {
          font-size: 16px;
          text-align: center;
          margin-bottom: 20px;
          color: #28a745;
        }
      `}</style>
    </div>
  );
};

export default BookNow;
