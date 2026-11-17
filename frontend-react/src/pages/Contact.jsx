
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        alert('Thank you! Your message has been received.');

        setForm({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <nav className="flex justify-between items-center px-8 md:px-16 py-5 border-b border-slate-800">
                <Link to="/" className="text-3xl font-bold text-cyan-400">
                    DroneX.
                </Link>
                <Link to="/" className="text-cyan-400 hover:text-white">
                    Back to Home
                </Link>
            </nav>

            <section className="text-center px-6 py-14">
                <p className="text-cyan-400 font-semibold tracking-widest">
                    GET IN TOUCH
                </p>

                <h1 className="text-4xl md:text-5xl font-bold mt-4">
                    Contact <span className="text-cyan-400">Us</span>
                </h1>

                <p className="text-gray-400 mt-5">
                    Have questions about drone rentals? Send us a message.
                </p>
            </section>

            <section className="max-w-2xl mx-auto px-6 pb-20">

                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-900 p-8 rounded-2xl space-y-5"
                >

                    <div>
                        <label className="block mb-2 text-gray-300">Full Name</label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Enter your name"
                            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-300">Email</label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-300">Message</label>
                        <textarea
                            required
                            rows="5"
                            value={form.message}
                            onChange={(e) =>
                                setForm({ ...form, message: e.target.value })
                            }
                            placeholder="Write your message..."
                            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-3 rounded-lg"
                    >
                        Send Message
                    </button>

                </form>
            </section>

            <footer className="text-center py-8 text-gray-500">
                © 2026 DroneX. All Rights Reserved.
            </footer>

        </div>
    );
}

export default Contact;
