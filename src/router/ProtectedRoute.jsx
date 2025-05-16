import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { session } = useSelector((state) => state.auth);

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;