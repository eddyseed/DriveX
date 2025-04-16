import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

type ProtectedRoutesProps = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user } = useAuth();

if (!user) {
    alert('Please log in first to access the dashboard.');
    return <Navigate to="/user/login" replace />;
}

  return <>{children}</>;
};

export default ProtectedRoutes;
