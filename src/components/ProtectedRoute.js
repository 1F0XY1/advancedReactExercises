import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
