
import { useEffect, useState } from 'react';

function Admin() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDrones: 0,
        totalBookings: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentAdmin');
        window.location.href = '/admin-login';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-cyan-400">
                    DroneX Admin Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-5">
                Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                <div className="bg-slate-800 p-6 rounded-xl">
                    <h3 className="text-gray-400">Total Users</h3>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl">
                    <h3 className="text-gray-400">Total Drones</h3>
                    <p className="text-3xl font-bold">{stats.totalDrones}</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl">
                    <h3 className="text-gray-400">Total Bookings</h3>
                    <p className="text-3xl font-bold">{stats.totalBookings}</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl">
                    <h3 className="text-gray-400">Total Revenue</h3>
                    <p className="text-3xl font-bold text-green-400">
                        ₹{stats.totalRevenue}
                    </p>
                </div>

            </div>

            <h2 className="text-xl font-semibold mt-10 mb-5">
                Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <a href="/manage-drones"
                    className="bg-slate-800 p-6 rounded-xl text-cyan-400 hover:bg-slate-700">
                    <h3 className="text-xl font-bold">Manage Drones</h3>
                    <p className="text-gray-400 mt-2">Add and delete drones</p>
                </a>

                <a href="/manage-users"
                    className="bg-slate-800 p-6 rounded-xl text-cyan-400 hover:bg-slate-700">
                    <h3 className="text-xl font-bold">Manage Users</h3>
                    <p className="text-gray-400 mt-2">View and delete users</p>
                </a>

                <a href="/manage-bookings"
                    className="bg-slate-800 p-6 rounded-xl text-cyan-400 hover:bg-slate-700">
                    <h3 className="text-xl font-bold">Manage Bookings</h3>
                    <p className="text-gray-400 mt-2">View all bookings</p>
                </a>

            </div>

        </div>
    );
}

export default Admin;
