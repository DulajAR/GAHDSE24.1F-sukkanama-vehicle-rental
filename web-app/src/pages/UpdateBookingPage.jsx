import React from "react";
import { useParams } from "react-router-dom";
import UpdateBooking from "../components/UpdateBooking";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UpdateBookingPage = () => {
  const { bookingId } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Ensure Header is at top */}
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl py-10">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            Update Your Booking
          </h2>

          <UpdateBooking bookingId={bookingId} />
        </div>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
};

export default UpdateBookingPage;