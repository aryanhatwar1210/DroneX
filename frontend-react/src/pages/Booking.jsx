
import { useEffect, useState } from 'react';

function Booking() {
    const [drones, setDrones] = useState([]);
    const [droneId, setDroneId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingDrones, setFetchingDrones] = useState(true);
    const [success, setSuccess] = useState(false);

    // FETCH DRONES FROM DATABASE
    useEffect(() => {
        fetch('http://localhost:8080/api/drones')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to fetch drones');
                }
                return response.json();
            })
            .then(data => {
                const availableDrones = data.filter(
                    drone => drone.available
                );

                setDrones(availableDrones);

                if (availableDrones.length > 0) {
                    setDroneId(String(availableDrones[0].id));
                }
            })
            .catch(error => {
                console.error('Drone Error:', error);
                setMessage('Unable to load drones. Please try again.');
            })
            .finally(() => {
                setFetchingDrones(false);
            });
    }, []);

    // SELECTED DRONE
    const selectedDrone = drones.find(
        drone => String(drone.id) === droneId
    );

    // CALCULATE RENTAL DAYS
    const days = startDate && endDate
        ? Math.max(
            0,
            Math.round(
                (
                    new Date(endDate + 'T00:00:00') -
                    new Date(startDate + 'T00:00:00')
                ) / 86400000
            ) + 1
        )
        : 0;

    // CALCULATE TOTAL PRICE
    const totalPrice = selectedDrone
        ? days * Number(selectedDrone.pricePerDay)
        : 0;

    // TODAY'S DATE
    const today = (() => {
        const date = new Date();
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - offset * 60000)
            .toISOString()
            .split('T')[0];
    })();

    // SAVE BOOKING
    async function handleBooking(e) {
        e.preventDefault();

        setMessage('');
        setSuccess(false);

        if (!selectedDrone) {
            setMessage('Please select an available drone.');
            return;
        }

        if (!customerName.trim() || !customerEmail.trim()) {
            setMessage('Please enter your name and email.');
            return;
        }

        if (!startDate || !endDate || days <= 0) {
            setMessage('Please select valid booking dates.');
            return;
        }

        const bookingData = {
            customerName: customerName.trim(),
            customerEmail: customerEmail.trim(),
            droneId: selectedDrone.id,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice
        };

        try {
            setLoading(true);

            // CORRECT API URL
            const response = await fetch(
                'http://localhost:8080/api/bookings',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                }
            );

            const responseData = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    responseData.message ||
                    `Booking failed with status ${response.status}`
                );
            }

            console.log('Booking Saved:', responseData);

            setSuccess(true);
            setMessage(
                `Booking successful! Your Booking ID is ${responseData.id}`
            );

            setCustomerName('');
            setCustomerEmail('');
            setStartDate('');
            setEndDate('');

        } catch (error) {
            console.error('Booking Error:', error);
            setSuccess(false);
            setMessage(error.message || 'Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">

            <form
                onSubmit={handleBooking}
                className="max-w-xl mx-auto bg-slate-900 p-8 rounded-2xl"
            >

                <h1 className="text-3xl font-bold text-cyan-400 mb-6">
                    Book Your Drone
                </h1>

                {/* CUSTOMER NAME */}
                <label className="block mb-2">
                    Customer Name
                </label>

                <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-3 bg-slate-800 rounded-lg mb-5"
                    required
                />

                {/* CUSTOMER EMAIL */}
                <label className="block mb-2">
                    Email Address
                </label>

                <input
                    type="email"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 bg-slate-800 rounded-lg mb-5"
                    required
                />

                {/* DRONE SELECTION */}
                <label className="block mb-2">
                    Select Drone
                </label>

                <select
                    value={droneId}
                    onChange={e => setDroneId(e.target.value)}
                    className="w-full p-3 bg-slate-800 rounded-lg mb-5"
                    required
                    disabled={fetchingDrones || drones.length === 0}
                >
                    {fetchingDrones && (
                        <option value="">Loading drones...</option>
                    )}

                    {!fetchingDrones && drones.length === 0 && (
                        <option value="">No drones available</option>
                    )}

                    {drones.map(drone => (
                        <option key={drone.id} value={drone.id}>
                            {drone.name}
                        </option>
                    ))}
                </select>

                {/* START DATE */}
                <label className="block mb-2">
                    Start Date
                </label>

                <input
                    type="date"
                    min={today}
                    value={startDate}
                    onChange={e => {
                        setStartDate(e.target.value);
                        setEndDate('');
                    }}
                    className="w-full p-3 bg-slate-800 rounded-lg mb-5"
                    required
                />

                {/* END DATE */}
                <label className="block mb-2">
                    End Date
                </label>

                <input
                    type="date"
                    min={startDate || today}
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full p-3 bg-slate-800 rounded-lg mb-5"
                    required
                />

                {/* PRICE DETAILS */}
                <div className="bg-slate-800 p-5 rounded-xl mb-5">

                    <p className="text-gray-400">
                        Price per day
                    </p>

                    <p className="text-xl font-bold">
                        ₹{Number(selectedDrone?.pricePerDay || 0).toLocaleString('en-IN')}
                    </p>

                    <p className="text-gray-400 mt-3">
                        Rental Days: {days}
                    </p>

                    <p className="text-cyan-400 text-2xl font-bold mt-3">
                        Total: ₹{totalPrice.toLocaleString('en-IN')}
                    </p>

                </div>

                {/* CONFIRM BOOKING */}
                <button
                    type="submit"
                    disabled={
                        loading ||
                        fetchingDrones ||
                        drones.length === 0
                    }
                    className="w-full bg-cyan-500 text-slate-950 font-bold p-3 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
                >
                    {loading ? 'Saving Booking...' : 'Confirm Booking'}
                </button>

                {/* MESSAGE */}
                {message && (
                    <p className={`text-center mt-5 ${success ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {message}
                    </p>
                )}

            </form>
        </div>
    );
}

export default Booking;
