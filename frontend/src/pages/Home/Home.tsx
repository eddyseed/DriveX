import React from 'react';
import LandingPage from './Components/LandingPage';
import CateogorySection from './Components/CategoryPage';
import { useLocation } from 'react-router-dom';
import SuccessModal from '../../components/Common/Modals/SuccessModal';
import { useEffect, useState } from 'react';


const Home: React.FC = () => {
  const location = useLocation();
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [carAdditionInfo, setCarAdditionInfo] = useState(false);
  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowLoginSuccess(true);
      window.history.replaceState({}, document.title);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const logoutSuccess = urlParams.get('logout');
    if (logoutSuccess) {
      setLogoutSuccess(true);
      window.history.replaceState({}, document.title);
      window.history.pushState({}, document.title, '/');
    }
    // const carAdded = urlParams.get('carAdded');
    // if (carAdded) {
    //   setCarAdditionInfo(true);
    //   window.history.replaceState({}, document.title);
    //   window.history.pushState({}, document.title, '/');
    // }
    if(location.state?.carAdded) {
      setCarAdditionInfo(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div>
      {showLoginSuccess && (
        <SuccessModal
          successHead="Welcome Back"
          successMsg="Login Successful"
          visible={true}
          onClose={() => setShowLoginSuccess(false)}
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
      {carAdditionInfo && (
        <SuccessModal
          successHead="Car Added"
          successMsg="Your car has been added successfully."
          visible={true}
          onClose={() => setCarAdditionInfo(false)}
        />
      )}
      <LandingPage />
      <CateogorySection />
    </div>
  );
};

export default Home;