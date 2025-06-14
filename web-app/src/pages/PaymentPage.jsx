import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { differenceInDays, parseISO } from 'date-fns';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Header from '../components/Header'; // ✅ Import Header
import Footer from '../components/Footer'; // ✅ Import Footer

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef(null);

  if (!state) return <p>Error: No payment data found.</p>;

  const { bookingId, vehicle, startDate, endDate, perDayCharge } = state;

  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const totalDays = differenceInDays(end, start) + 1;
  const totalAmount = parseInt(perDayCharge) * totalDays;

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleFakePay = async () => {
    setPaying(true);
    setTimeout(async () => {
      try {
        const bookingRef = doc(db, 'bookings', bookingId);
        await updateDoc(bookingRef, {
          paidAt: serverTimestamp(),
          paymentInfo: {
            totalAmount,
            method: 'Card',
            cardLast4: cardDetails.cardNumber.slice(-4)
          }
        });
        setPaid(true);
      } catch (err) {
        console.error('Failed to update booking:', err);
        alert('❌ Payment failed. Please try again.');
      } finally {
        setPaying(false);
      }
    }, 2000);
  };

  const handleDownloadReceipt = async () => {
    const receiptElement = receiptRef.current;
    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${bookingId}.pdf`);
  };

  return (
    <div style={styles.pageWrapper}>
      <Header /> {/* ✅ Header at top */}

      <div style={styles.contentWrapper}>
        <h2 style={{ marginBottom: '20px' }}>Demo Payment Page</h2>

        {!paid ? (
          <div style={styles.card}>
            <h3>{vehicle.model} ({vehicle.plate})</h3>
            <img src={vehicle.vehicleImageUrl} alt="Vehicle" style={styles.image} />
            <p><strong>From:</strong> {startDate}</p>
            <p><strong>To:</strong> {endDate}</p>
            <p><strong>Days:</strong> {totalDays}</p>
            <p><strong>Per Day:</strong> Rs. {perDayCharge}</p>
            <p><strong>Total:</strong> Rs. {totalAmount}</p>
            <hr style={{ margin: '20px 0' }} />
            <h4>Card Details (Demo)</h4>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="cardHolder"
              placeholder="Cardholder Name"
              value={cardDetails.cardHolder}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <div style={styles.row}>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleChange}
                style={{ ...styles.input, marginRight: "5px" }}
                required
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleChange}
                style={{ ...styles.input, marginLeft: "5px" }}
                required
              />
            </div>
            <button
              style={styles.button}
              onClick={handleFakePay}
              disabled={
                paying ||
                !cardDetails.cardNumber ||
                !cardDetails.cardHolder ||
                !cardDetails.expiry ||
                !cardDetails.cvv
              }
            >
              {paying ? 'Processing...' : 'Pay Now 💳'}
            </button>
          </div>
        ) : (
          <div style={styles.receiptCard} ref={receiptRef}>
            <h3>📄 Payment Receipt</h3>
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Vehicle:</strong> {vehicle.model} ({vehicle.plate})</p>
            <p><strong>From:</strong> {startDate}</p>
            <p><strong>To:</strong> {endDate}</p>
            <p><strong>Days:</strong> {totalDays}</p>
            <p><strong>Total Amount:</strong> Rs. {totalAmount}</p>
            <p><strong>Card Last 4:</strong> {cardDetails.cardNumber.slice(-4)}</p>
            <p><strong>Status:</strong> Pending</p>

            <button style={styles.button} onClick={handleDownloadReceipt}>
              Download Receipt 🧾
            </button>
            <button
              style={{ ...styles.button, backgroundColor: '#007bff' }}
              onClick={() => navigate('/customer-dashboard')}
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>

      <Footer /> {/* ✅ Footer at bottom */}
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  },
  contentWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    flexDirection: 'column',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px'
  },
  receiptCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '420px'
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '15px',
    objectFit: 'cover',
    maxHeight: '200px'
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '12px'
  }
};

export default PaymentPage;
