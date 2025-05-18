import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays, isWithinInterval, parseISO, eachDayOfInterval } from 'date-fns';

const BookNow = () => {
  const { vehicleId } = useParams();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);
  const [bookedRanges, setBookedRanges] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [vehicleOwnerId, setVehicleOwnerId] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await ensureCustomerProfile(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const ensureCustomerProfile = async (currentUser) => {
    const customerRef = doc(db, 'customers', currentUser.uid);
    const docSnap = await getDoc(customerRef);
    if (!docSnap.exists()) {
      await setDoc(customerRef, {
        email: currentUser.email,
        f_name: '',
        l_name: '',
        d_licen: '',
        nic: '',
        tel_no: '',
        user_type: 'customer',
        reg_date: new Date().toISOString().split('T')[0]
      });
    }
  };

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!vehicleId) {
        setMessage('❌ Vehicle ID not provided.');
        return;
      }
      try {
        const vehicleRef = doc(db, 'vehicles', vehicleId);
        const vehicleSnap = await getDoc(vehicleRef);
        if (!vehicleSnap.exists()) {
          setMessage('❌ Vehicle not found in database.');
          return;
        }
        const data = vehicleSnap.data();
        setVehicleDetails(data);
        if (data.userId) {
          setVehicleOwnerId(data.userId);
        } else {
          setMessage('❌ Vehicle owner not found.');
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setMessage('❌ Failed to fetch vehicle data.');
      }
    };

    const fetchBookedRanges = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('vehicleId', '==', vehicleId));
        const querySnapshot = await getDocs(q);
        const ranges = [];
        const allDisabledDates = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status !== 'Rejected') {
            const start = parseISO(data.startDate);
            const end = parseISO(data.endDate);
            ranges.push({ start, end });
            const rangeDays = eachDayOfInterval({ start, end });
            allDisabledDates.push(...rangeDays);
          }
        });

        setBookedRanges(ranges);
        setDisabledDates(allDisabledDates);
      } catch (err) {
        console.error('Error loading booked dates:', err);
      }
    };

    fetchVehicleDetails();
    fetchBookedRanges();
  }, [vehicleId]);

  const isOverlapping = (startDate, endDate) => {
    return bookedRanges.some(range =>
      isWithinInterval(startDate, { start: range.start, end: range.end }) ||
      isWithinInterval(endDate, { start: range.start, end: range.end }) ||
      (startDate <= range.start && endDate >= range.end)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { startDate, endDate } = dateRange[0];

    if (!user) {
      setMessage('❌ User is not authenticated.');
      setLoading(false);
      return;
    }

    if (!vehicleOwnerId) {
      setMessage('❌ Vehicle owner not found.');
      setLoading(false);
      return;
    }

    if (isOverlapping(startDate, endDate)) {
      setMessage('❌ Selected date range overlaps with an existing booking.');
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        vehicleId,
        vehicleOwnerId,
        customerId: user.uid,
        customerEmail: user.email,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        phone,
        status: 'Pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'bookings'), bookingData);
      setMessage(`✅ Booking confirmed! Booking ID: ${docRef.id}`);
      setPhone('');
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('❌ Booking failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <button type="button" onClick={handleBack} className="back-button">
          &#x2190; Back
        </button>

        <h3>Book This Vehicle</h3>
        {message && <p className="booking-message">{message}</p>}

        {vehicleDetails ? (
          <div className="vehicle-info">
            <h4>{vehicleDetails.model || 'Vehicle Model Not Specified'}</h4>
            {vehicleDetails.vehicleImageUrl && (
              <img
                src={vehicleDetails.vehicleImageUrl}
                alt="Vehicle"
                className="vehicle-img"
              />
            )}
            <p><strong>Plate:</strong> {vehicleDetails.plate || 'N/A'}</p>
            <p><strong>Brand:</strong> {vehicleDetails.brand || 'N/A'}</p>
            <p><strong>Engine Capacity:</strong> {vehicleDetails.eng_capacity || 'N/A'}</p>
            <p><strong>Fuel Type:</strong> {vehicleDetails.f_type || 'N/A'}</p>
            <p><strong>Transmission:</strong> {vehicleDetails.t_mission || 'N/A'}</p>
            <p><strong>Seats:</strong> {vehicleDetails.seat_capacity || 'N/A'}</p>
            <p><strong>Doors:</strong> {vehicleDetails.no_of_doors || 'N/A'}</p>
            <p><strong>Year:</strong> {vehicleDetails.yom || 'N/A'}</p>
            <p><strong>Color:</strong> {vehicleDetails.color || 'N/A'}</p>
            <p><strong>Price/Day:</strong> Rs. {vehicleDetails.per_day_chrg || 'N/A'}</p>
            <p><strong>Description:</strong> {vehicleDetails.description || 'N/A'}</p>
            <p><strong>Supplier Email:</strong> {vehicleDetails.userEmail || 'N/A'}</p>
          </div>
        ) : (
          <p>Loading vehicle details...</p>
        )}

        <label>Select Booking Dates:</label>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          minDate={new Date()}
          disabledDates={disabledDates}
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

      <style jsx>{`
        .booking-container {
          max-width: 700px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .booking-form {
          display: flex;
          flex-direction: column;
        }

        .booking-form h3 {
          font-size: 24px;
          text-align: center;
          margin-bottom: 20px;
        }

        .vehicle-info {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .vehicle-info p {
          margin: 5px 0;
        }

        .vehicle-img {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
          border-radius: 6px;
        }

        .booking-form label {
          margin: 15px 0 8px;
          font-size: 16px;
        }

        .booking-form input {
          padding: 10px;
          margin-bottom: 15px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .submit-button {
          padding: 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 18px;
          cursor: pointer;
        }

        .submit-button:disabled {
          background-color: #aaa;
        }

        .booking-message {
          text-align: center
          margin-bottom: 15px;
          font-weight: bold;
        }

        .back-button {
          margin-bottom: 10px;
          background: none;
          border: none;
          color: #007bff;
          cursor: pointer;
          font-size: 16px;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default BookNow;
