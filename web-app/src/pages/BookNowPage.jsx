// src/pages/BookNowPage.jsx
import React, { useEffect, useState } from 'react';
import BookNow from '../components/BookNow';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BookNowPage = () => {
  const vehicleId = 'honda-vezel-001';
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?vehicleId=${vehicleId}`);
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();

        const formattedEvents = data.map((booking, index) => ({
          id: index,
          title: 'Booked',
          start: booking.startDate,
          end: booking.endDate,
        }));

        setEvents(formattedEvents);
      } catch (err) {
        console.error('Calendar load error:', err);
      }
    };

    fetchBookings();
  }, [vehicleId]);

  return (
    <div>
      <Header />

      <main className="book-now-page" style={{ padding: '2rem' }}>
        <h2>Book Honda Vezel</h2>

        <div className="vehicle-details" style={{ marginBottom: '2rem' }}>
          <p><strong>Engine:</strong> 2000cc</p>
          <p><strong>Fuel:</strong> Diesel</p>
          <p><strong>Transmission:</strong> Auto</p>
          <p><strong>Seats:</strong> 9</p>
          <p><strong>Year:</strong> 2018</p>
          <p><strong>Color:</strong> White</p>
          <p><strong>Price/Day:</strong> Rs. 3000</p>
          <p><strong>Supplier:</strong> Dulaj Ayeshmantha (0788568282 | dulajayeshmantha91@gmail.com)</p>
        </div>

        <BookNow vehicleId={vehicleId} />

        <h3 style={{ marginTop: '3rem' }}>Availability Calendar</h3>
        <div style={{ maxWidth: '800px', marginTop: '1rem' }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookNowPage;
