import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth to get authentication status

// PrivateRoute component that protects routes
export const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated, else render the requested route
  return isAuthenticated ? (
    element // Render the component passed via the `element` prop
  ) : (
    <Navigate to="/" replace /> // Redirect to login page
  );
};
