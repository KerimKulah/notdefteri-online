import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    // Kullanıcı giriş yaptıysa yönlendir
    if (user) {
        return <Navigate to="/" />;
    }

    // Giriş yapmamışsa bileşeni göster
    return children;
}

export default PublicRoute;
