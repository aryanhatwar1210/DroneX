
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from 'react-router-dom';

import './App.css';

import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import ManageDrones from './pages/ManageDrones';
import ManageBookings from './pages/ManageBookings';
import ManageUsers from './pages/ManageUsers';
import ProtectedAdmin from './components/ProtectedAdmin';

import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/about';

function Home() {
  const [backendMessage, setBackendMessage] = useState('Connecting to backend...');
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [droneError, setDroneError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/test')
      .then(response => {
        if (!response.ok) throw new Error('Backend request failed');
        return response.text();
      })
      .then(data => setBackendMessage(data))
      .catch(error => {
        console.error(error);
        setBackendMessage('Backend connection failed!');
      });

    fetch('http://localhost:8080/api/drones')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch drones');
        return response.json();
      })
      .then(data => {
        setDrones(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setDroneError('Unable to load drones. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="flex flex-wrap items-center justify-between gap-5 px-8 md:px-16 py-5 border-b border-slate-800">

        <Link to="/" className="text-3xl font-bold text-cyan-400">
          DroneX<span className="text-white">.</span>
        </Link>

        <div className="flex flex-wrap gap-5 text-gray-300">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <a href="#drones" className="hover:text-cyan-400">Explore Drones</a>
          <Link to="/about" className="hover:text-cyan-400">About</Link>
          <Link to="/contact" className="hover:text-cyan-400">Contact</Link>
          <Link to="/my-bookings" className="hover:text-cyan-400">My Bookings</Link>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/login" className="border border-cyan-400 text-cyan-400 px-5 py-2 rounded-lg">
            Login
          </Link>

          <Link to="/register" className="bg-cyan-500 px-5 py-2 rounded-lg font-semibold text-slate-950">
            Register
          </Link>

          <Link to="/admin-login" className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg text-white">
            Admin
          </Link>
        </div>

      </nav>

      <section className="min-h-[550px] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 gap-10">

        <div className="max-w-xl">
          <p className="text-cyan-400 font-semibold tracking-widest mb-5">
            YOUR SKY, YOUR RULES
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Explore The Sky
            <span className="text-cyan-400"> With DroneX</span>
          </h1>

          <p className="text-gray-400 text-lg mt-6">
            Rent premium drones for photography, videography and professional aerial experiences.
            Book your perfect drone today.
          </p>

          <div className="mt-5 text-sm text-cyan-300">
            Backend Status: {backendMessage}
          </div>

          <Link to="/booking" className="inline-block bg-cyan-500 text-slate-950 font-bold px-7 py-3 rounded-lg mt-8">
            Explore Drones
          </Link>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1000"
            alt="Professional Drone"
            className="w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>

      </section>

      <section id="drones" className="px-8 md:px-16 py-16 bg-slate-900">

        <div className="text-center mb-12">
          <p className="text-cyan-400 font-semibold">OUR COLLECTION</p>
          <h2 className="text-4xl font-bold mt-3">
            Featured <span className="text-cyan-400">Drones</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Choose the perfect drone for your next adventure.
          </p>
        </div>

        {loading && <p className="text-center text-cyan-400">Loading drones...</p>}

        {!loading && droneError && (
          <p className="text-center text-red-400">{droneError}</p>
        )}

        {!loading && !droneError && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {drones.filter(drone => drone.available).map(drone => (
              <div key={drone.id} className="bg-slate-800 rounded-2xl overflow-hidden">
                <img
                  src={drone.imageUrl || 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=800'}
                  alt={drone.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold">{drone.name}</h3>
                  <p className="text-gray-400 mt-2">{drone.description}</p>
                  <p className="text-cyan-400 text-xl font-bold mt-5">
                    ₹{Number(drone.pricePerDay).toLocaleString('en-IN')} / day
                  </p>

                  <Link to="/booking" className="block text-center w-full mt-5 bg-cyan-500 text-slate-950 py-3 rounded-lg font-bold">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !droneError && drones.filter(drone => drone.available).length === 0 && (
          <p className="text-center text-gray-400">No drones are currently available.</p>
        )}

      </section>

      <footer className="text-center py-8 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-cyan-400">DroneX.</h2>
        <p className="text-gray-400 mt-3">Your Sky, Your Rules.</p>

        <div className="flex justify-center gap-6 mt-4 text-gray-400">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <p className="text-gray-500 mt-4 text-sm">
          © 2026 DroneX. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route element={<ProtectedAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/manage-drones" element={<ManageDrones />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-bookings" element={<ManageBookings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
