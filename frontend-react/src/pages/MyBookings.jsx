
import { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('Loading bookings...');

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser') || 'null'
  );

  // FETCH LOGGED-IN USER BOOKINGS
  useEffect(() => {
    if (!currentUser || !currentUser.email) {
      setMessage('Please login to view your bookings.');
      return;
    }

    fetch(
      `http://localhost:8080/api/bookings/admin/all?email=${encodeURIComponent(currentUser.email)}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to load bookings');
        }
        return response.json();
      })
      .then(data => {
        setBookings(data);

        setMessage(
          data.length === 0
            ? 'No bookings found.'
            : ''
        );
      })
      .catch(error => {
        console.error('Booking Error:', error);
        setMessage('Failed to load bookings.');
      });
  }, []);

  // CANCEL BOOKING
  async function cancelBooking(id) {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    if (!currentUser || !currentUser.email) {
      alert('Please login first.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/${id}/cancel?email=${encodeURIComponent(currentUser.email)}`,
        {
          method: 'PUT'
        }
      );

      if (!response.ok) {
        throw new Error('Booking cancellation failed.');
      }

      const updatedBooking = await response.json();

      setBookings(previous =>
        previous.map(booking =>
          booking.id === id ? updatedBooking : booking
        )
      );

      alert('Booking cancelled successfully!');

    } catch (error) {
      console.error('Cancel Error:', error);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        My Bookings
      </h1>

      {message && (
        <p className="text-center text-gray-300 mb-6">
          {message}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">

        {bookings.map(booking => (
          <div
            key={booking.id}
            className="bg-slate-900 p-6 rounded-xl border border-slate-700"
          >

            <h2 className="text-xl font-bold mb-4">
              Booking #{booking.id}
            </h2>

            <p>Customer: {booking.customerName}</p>
            <p>Email: {booking.customerEmail}</p>
            <p>Drone ID: {booking.droneId}</p>
            <p>Start Date: {booking.startDate}</p>
            <p>End Date: {booking.endDate}</p>
            <p>Total Price: ₹{booking.totalPrice}</p>

            <p className="mt-3">
              Status:{' '}
              <span
                className={
                  booking.status === 'CONFIRMED'
                    ? 'text-green-400'
                    : 'text-red-400'
                }
              >
                {booking.status}
              </span>
            </p>

            {booking.status === 'CONFIRMED' && (
              <button
                onClick={() => cancelBooking(booking.id)}
                className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
              >
                Cancel Booking
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default MyBookings;
