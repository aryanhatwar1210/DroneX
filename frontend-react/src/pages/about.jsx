
import { Link } from 'react-router-dom';

function About() {
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

            <section className="px-8 md:px-20 py-20 text-center">
                <p className="text-cyan-400 font-semibold tracking-widest">
                    ABOUT DRONEX
                </p>

                <h1 className="text-4xl md:text-6xl font-bold mt-4">
                    Discover The Sky With <span className="text-cyan-400">DroneX</span>
                </h1>

                <p className="text-gray-400 max-w-3xl mx-auto mt-8 text-lg leading-relaxed">
                    DroneX is a drone rental platform designed to make
                    professional drones accessible to everyone.
                    Whether you are a photographer, filmmaker, traveler
                    or drone enthusiast, we help you find the right drone
                    for your next adventure.
                </p>
            </section>

            <section className="px-8 md:px-20 py-12 bg-slate-900">
                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-slate-800 p-8 rounded-2xl">
                        <h2 className="text-2xl text-cyan-400 font-bold">Our Mission</h2>
                        <p className="text-gray-400 mt-4">
                            To make drone rental simple, affordable and accessible.
                        </p>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-2xl">
                        <h2 className="text-2xl text-cyan-400 font-bold">Our Vision</h2>
                        <p className="text-gray-400 mt-4">
                            To create new opportunities for aerial photography
                            and creative exploration.
                        </p>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-2xl">
                        <h2 className="text-2xl text-cyan-400 font-bold">Why DroneX?</h2>
                        <p className="text-gray-400 mt-4">
                            Explore premium drones, compare options and book
                            your preferred drone easily.
                        </p>
                    </div>

                </div>
            </section>

            <footer className="text-center py-8 text-gray-500">
                © 2026 DroneX. All Rights Reserved.
            </footer>

        </div>
    );
}

export default About;
