import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookNow from '../components/BookNow';

const BookNowPage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <BookNow vehicleId={vehicleId} navigate={navigate} />
      </main>
      <Footer />
    </div>
  );
};

export default BookNowPage;
