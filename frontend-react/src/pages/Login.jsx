
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setMessage('');

        try {
            setLoading(true);

            const response = await fetch(
                'http://localhost:8080/api/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Invalid email or password'
                );
            }

            // STORE LOGGED-IN USER
            localStorage.setItem(
                'currentUser',
                JSON.stringify(data)
            );

            setMessage('Login successful!');

            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (error) {
            console.error('Login Error:', error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5 text-white">

            <form
                onSubmit={handleLogin}
                className="bg-slate-900 p-8 rounded-2xl w-full max-w-md"
            >

                <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">
                    DroneX Login
                </h1>

                <label>Email</label>

                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mt-2 mb-5 bg-slate-800 rounded-lg"
                    placeholder="Enter email"
                />

                <label>Password</label>

                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mt-2 mb-6 bg-slate-800 rounded-lg"
                    placeholder="Enter password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 text-slate-950 font-bold p-3 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {message && (
                    <p className="text-center text-cyan-400 mt-5">
                        {message}
                    </p>
                )}

                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-cyan-400">
                        Register
                    </Link>
                </p>

            </form>
        </div>
    );
}

export default Login;
