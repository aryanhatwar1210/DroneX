
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedAdmin() {
    const currentAdmin = JSON.parse(
        localStorage.getItem('currentAdmin') || 'null'
    );

    if (!currentAdmin || !currentAdmin.email) {
        return <Navigate to="/admin-login" replace />;
    }

    return <Outlet />;
}

export default ProtectedAdmin;
