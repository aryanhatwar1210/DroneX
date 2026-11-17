
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(
                'http://localhost:8080/api/admin/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Invalid email or password'
                );
            }

            localStorage.setItem(
                'currentAdmin',
                JSON.stringify(data)
            );

            setMessage('Admin Login Successful!');

            navigate('/admin');

        } catch (error) {
            console.error('Admin Login Error:', error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5 text-white">

            <form
                onSubmit={handleLogin}
                className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-md"
            >

                <h1 className="text-3xl font-bold text-cyan-400 text-center mb-3">
                    DroneX Admin
                </h1>

                <p className="text-gray-400 text-center mb-8">
                    Admin Login Portal
                </p>

                <label className="block mb-2">
                    Email
                </label>

                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="w-full p-3 mb-5 bg-slate-800 rounded-lg outline-none"
                />

                <label className="block mb-2">
                    Password
                </label>

                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full p-3 mb-6 bg-slate-800 rounded-lg outline-none"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 text-slate-950 font-bold p-3 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Admin Login'}
                </button>

                {message && (
                    <p className="text-center text-cyan-400 mt-5">
                        {message}
                    </p>
                )}

            </form>
        </div>
    );
}

export default AdminLogin;
