
import { useEffect, useState } from 'react';

function ManageBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/bookings/admin/all')
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <h1 className="text-3xl font-bold text-cyan-400 mb-6">
                Manage Bookings
            </h1>

            {bookings.map(booking => (
                <div key={booking.id}
                    className="bg-slate-900 p-5 rounded-xl mb-4">
                    <h2 className="font-bold">
                        Booking #{booking.id}
                    </h2>
                    <p>Customer: {booking.customerName}</p>
                    <p>Email: {booking.customerEmail}</p>
                    <p>Drone ID: {booking.droneId}</p>
                    <p>Dates: {booking.startDate} to {booking.endDate}</p>
                    <p>Price: ₹{booking.totalPrice}</p>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
        </div>
    );
}

export default ManageBookings;
