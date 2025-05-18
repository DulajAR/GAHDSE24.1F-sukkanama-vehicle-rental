import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  const [copiedBookingId, setCopiedBookingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCustomerId(user.uid);
      } else {
        setCustomerId(null);
        setBookings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!customerId) {
        setBookings([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where('customerId', '==', customerId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setBookings([]);
          setLoading(false);
          return;
        }

        const bookingsData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const booking = docSnap.data();

            let vehicle = null;
            if (booking.vehicleId) {
              const vehicleRef = doc(db, 'vehicles', booking.vehicleId);
              const vehicleSnap = await getDoc(vehicleRef);
              vehicle = vehicleSnap.exists() ? vehicleSnap.data() : null;
            }

            let owner = null;
            if (booking.vehicleOwnerId) {
              const ownerRef = doc(db, 'suppliers', booking.vehicleOwnerId);
              const ownerSnap = await getDoc(ownerRef);
              owner = ownerSnap.exists() ? ownerSnap.data() : null;
            }

            return {
              ...booking,
              bookingId: docSnap.id,
              vehicle,
              owner,
            };
          })
        );

        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [customerId]);

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
      alert('Booking deleted successfully.');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking.');
    }
  };

  const handleUpdate = (bookingId) => {
    navigate(`/update-booking/${bookingId}`);
  };

  const handleCopyBookingId = (bookingId) => {
    navigator.clipboard.writeText(bookingId).then(() => {
      setCopiedBookingId(bookingId);
      setTimeout(() => setCopiedBookingId(null), 2000);
    });
  };

  if (!customerId) {
    return (
      <p style={{ padding: '20px', fontSize: '16px', textAlign: 'center' }}>
        Please log in to see your bookings.
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Bookings</h2>
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : bookings.length === 0 ? (
        <p style={styles.noBookingsText}>No bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={booking.bookingId} style={styles.card}>
            <div style={styles.bookingIdContainer}>
              <strong>Booking ID:</strong> {booking.bookingId}
              <button
                style={styles.copyBtn}
                onClick={() => handleCopyBookingId(booking.bookingId)}
                title="Copy Booking ID"
              >
                📋
              </button>
              {copiedBookingId === booking.bookingId && (
                <span style={styles.copiedText}>Copied!</span>
              )}
            </div>

            <h3 style={styles.bookingTitle}>Booking #{index + 1}</h3>

            <div style={styles.section}>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Start Date:</strong> {booking.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {booking.endDate}
              </p>
              <p>
                <strong>Phone:</strong> {booking.phone}
              </p>
            </div>

            <hr style={styles.divider} />

            <h4 style={styles.sectionTitle}>Vehicle Details</h4>
            <div style={styles.section}>
              {booking.vehicle ? (
                <>
                  <p>
                    <strong>Brand:</strong> {booking.vehicle.brand}
                  </p>
                  <p>
                    <strong>Model:</strong> {booking.vehicle.model}
                  </p>
                  <p>
                    <strong>Plate:</strong> {booking.vehicle.plate}
                  </p>
                  <p>
                    <strong>Seats:</strong> {booking.vehicle.seat_capacity}
                  </p>
                  <p>
                    <strong>Fuel Type:</strong> {booking.vehicle.f_type}
                  </p>
                  <p>
                    <strong>Transmission:</strong> {booking.vehicle.t_mission}
                  </p>
                  <p>
                    <strong>Charge/Day:</strong> Rs. {booking.vehicle.per_day_chrg}
                  </p>

                  <div style={styles.imageContainer}>
                    {booking.vehicle.vehicleImageUrl ? (
                      <img
                        src={booking.vehicle.vehicleImageUrl}
                        alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                        style={styles.vehicleImage}
                      />
                    ) : (
                      <p>No vehicle image available.</p>
                    )}
                  </div>
                </>
              ) : (
                <p>Vehicle details not found.</p>
              )}
            </div>

            <hr style={styles.divider} />

            <h4 style={styles.sectionTitle}>Vehicle Owner Details</h4>
            <div style={styles.section}>
              {booking.owner ? (
                <>
                  <p>
                    <strong>Name:</strong> {booking.owner.f_name} {booking.owner.l_name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {booking.owner.tel_no}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.owner.email}
                  </p>
                </>
              ) : (
                <p>Owner details not found.</p>
              )}
            </div>

        <div style={styles.buttonGroup}>
  <button
    style={styles.updateBtn}
    onClick={() => handleUpdate(booking.bookingId)}
  >
    Update Booking
  </button>
  <button
    style={styles.deleteBtn}
    onClick={() => handleDelete(booking.bookingId)}
  >
    Delete Booking
  </button>
  <button
    style={styles.ratingBtn}
    onClick={() => navigate(`/rate-supplier?bookingId=${booking.bookingId}`)

}
  >
    Supplier Rating
  </button>
</div>

          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '25px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#343a40',
  },
  loadingText: {
    fontSize: '16px',
    color: '#555',
  },
  noBookingsText: {
    fontSize: '16px',
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '700px',
    textAlign: 'left',
  },
  bookingIdContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#6c757d',
  },
  copyBtn: {
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '2px 6px',
    fontSize: '14px',
    lineHeight: '1',
  },
  copiedText: {
    marginLeft: '8px',
    color: 'green',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  bookingTitle: {
    marginBottom: '15px',
    fontSize: '20px',
    color: '#007bff',
    borderBottom: '2px solid #007bff',
    paddingBottom: '5px',
  },
  section: {
    marginBottom: '15px',
    fontSize: '15px',
    lineHeight: '1.6',
    width: '100%',
  },
  sectionTitle: {
    marginBottom: '8px',
    fontSize: '22px',
    color: '#495057',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e9ecef',
    margin: '15px 0',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '10px',
    alignItems: 'center',
    width: '100%',
  },
  vehicleImage: {
    maxWidth: '300px',
   
borderRadius: '8px',
objectFit: 'cover',
boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
},
buttonGroup: {
display: 'flex',
justifyContent: 'flex-end',
gap: '15px',
},
updateBtn: {
backgroundColor: '#28a745',
border: 'none',
color: '#fff',
padding: '10px 18px',
borderRadius: '6px',
cursor: 'pointer',
fontWeight: '600',
fontSize: '14px',
},
deleteBtn: {
backgroundColor: '#dc3545',
border: 'none',
color: '#fff',
padding: '10px 18px',
borderRadius: '6px',
cursor: 'pointer',
fontWeight: '600',
fontSize: '14px',
},
};

export default CustomerBookings;