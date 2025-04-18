import React from 'react';
import LandingPage from './Components/LandingPage';
import CateogorySection from './Components/CategoryPage';
import { useLocation } from 'react-router-dom';
import SuccessModal from '../../components/Common/Modals/SuccessModal';
import { useEffect, useState } from 'react';


const Home: React.FC = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowSuccess(true);
      window.history.replaceState({}, document.title);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const logoutSuccess = urlParams.get('logout');
    if (logoutSuccess) {
      setLogoutSuccess(true);
      window.history.replaceState({}, document.title);
      window.history.pushState({}, document.title, '/');
    }
  }, [location]);

  return (
    <div>
      {showSuccess && (
        <SuccessModal
          successHead="Welcome Back"
          successMsg="Login Successful"
          visible={true}
          onClose={() => setShowSuccess(false)}
        />
      )}
      {logoutSuccess && (
        <SuccessModal
          successHead="Logout Successful"
          successMsg="You have been logged out successfully."
          visible={true}
          onClose={() => setLogoutSuccess(false)}
        />
      )}
      <LandingPage />
      <CateogorySection />
    </div>
  );
};

export default Home;