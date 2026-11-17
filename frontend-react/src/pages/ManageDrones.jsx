
import { useEffect, useState } from 'react';

function ManageDrones() {
    const [drones, setDrones] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const API = 'http://localhost:8080/api/drones';

    async function loadDrones() {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error('Unable to load drones');
            const data = await response.json();
            setDrones(data);
        } catch (error) {
            setMessage(error.message);
        }
    }

    useEffect(() => {
        loadDrones();
    }, []);

    async function handleAddDrone(e) {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    description,
                    pricePerDay: Number(pricePerDay),
                    imageUrl
                })
            });

            if (!response.ok) throw new Error('Could not add drone');

            setName('');
            setDescription('');
            setPricePerDay('');
            setImageUrl('');
            setMessage('Drone added successfully!');

            await loadDrones();
        } catch (error) {
            setMessage(error.message);
        }
    }

    async function handleDeleteDrone(id) {
        if (!window.confirm('Are you sure you want to delete this drone?')) {
            return;
        }

        try {
            const response = await fetch(`${API}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Could not delete drone');

            setMessage('Drone deleted successfully!');
            await loadDrones();
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

            <h1 className="text-3xl font-bold text-cyan-400 mb-8">
                Manage Drones
            </h1>

            <form
                onSubmit={handleAddDrone}
                className="bg-slate-900 border border-slate-700 p-6 rounded-2xl mb-10"
            >
                <h2 className="text-xl font-bold mb-5">
                    Add New Drone
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Drone Name"
                        className="p-3 bg-slate-800 rounded-lg"
                    />

                    <input
                        required
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={pricePerDay}
                        onChange={e => setPricePerDay(e.target.value)}
                        placeholder="Price Per Day"
                        className="p-3 bg-slate-800 rounded-lg"
                    />

                    <input
                        required
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="Drone Image URL"
                        className="p-3 bg-slate-800 rounded-lg md:col-span-2"
                    />

                    <textarea
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Drone Description"
                        className="p-3 bg-slate-800 rounded-lg md:col-span-2"
                    />

                </div>

                <button
                    type="submit"
                    className="mt-5 bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-lg hover:bg-cyan-400"
                >
                    Add Drone
                </button>
            </form>

            {message && (
                <p className="text-cyan-400 mb-5">{message}</p>
            )}

            <h2 className="text-2xl font-bold mb-5">
                Existing Drones ({drones.length})
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {drones.map(drone => (
                    <div
                        key={drone.id}
                        className="bg-slate-900 border border-slate-700 p-5 rounded-xl"
                    >
                        <img
                            src={drone.imageUrl}
                            alt={drone.name}
                            className="w-full h-44 object-cover rounded-lg mb-4"
                        />

                        <h3 className="text-xl font-bold">
                            {drone.name}
                        </h3>

                        <p className="text-gray-400 mt-2">
                            {drone.description}
                        </p>

                        <p className="text-cyan-400 font-bold mt-3">
                            ₹{drone.pricePerDay} / day
                        </p>

                        <button
                            onClick={() => handleDeleteDrone(drone.id)}
                            className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
                        >
                            Delete Drone
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ManageDrones;
