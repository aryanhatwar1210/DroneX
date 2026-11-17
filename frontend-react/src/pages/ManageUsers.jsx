
import { useEffect, useState } from 'react';

function ManageUsers() {
    const [users, setUsers] = useState([]);

    async function loadUsers() {
        const response = await fetch(
            'http://localhost:8080/api/users/admin/all'
        );
        const data = await response.json();
        setUsers(data);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function deleteUser(id) {
        if (!window.confirm('Delete this user?')) return;

        const response = await fetch(
            `http://localhost:8080/api/users/admin/${id}`,
            { method: 'DELETE' }
        );

        if (response.ok) loadUsers();
        else alert('Could not delete user.');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <h1 className="text-3xl text-cyan-400 font-bold mb-6">
                Manage Users
            </h1>

            {users.map(user => (
                <div key={user.id}
                    className="bg-slate-900 p-5 rounded-xl mb-4 flex justify-between items-center">
                    <div>
                        <h2 className="font-bold">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                    </div>

                    <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 px-4 py-2 rounded-lg">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ManageUsers;
