import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import ErrorModal from '../components/Common/Modals/ErrorModal';

type ProtectedRoutesProps = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [showRedirect, setShowRedirect] = useState(false);

  if (!user) {
    if (!showRedirect) {
      return <Navigate to="/user/login" state={{ from: location, loginRequired: true }} replace />;
    }

    return (
      <></>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
