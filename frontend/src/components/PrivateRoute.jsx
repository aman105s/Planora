import React from 'react';
import { Navigate } from 'react-router-dom';
import { parseJwt } from '../utils/auth';

export default function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Not logged in
    return <Navigate to="/role-selection" replace />;
  }

  const decoded = parseJwt(token);

  if (!decoded) {
    // Corrupt or invalid token format
    localStorage.removeItem('accessToken');
    return <Navigate to="/role-selection" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(decoded.role)) {
    // Logged in but doesn't have privileges for this dashboard
    return <Navigate to="/" replace />;
  }

  // Token exists and role authorized
  return children;
}
