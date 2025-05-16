import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const { session } = useSelector((state) => state.auth);

    if (session) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PublicRoute;
