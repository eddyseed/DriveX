import React from 'react';
import LandingPage from './Components/LandingPage';
import CateogorySection from './Components/CategoryPage';
import { useLocation } from 'react-router-dom';
import SuccessModal from '../../components/Common/Modals/SuccessModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

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

    if (location.state?.carAdded) {
      setCarAdditionInfo(true);
      window.history.replaceState({}, document.title);
    }

  }, [location]);

  const navigate = useNavigate();
  // const { setUser } = useAuth(); // if using context
  const { login } = useAuth();
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('OAuth session error:', error?.message);
        navigate('/auth/login');
        return;
      }

      const user = session.user;
      const formData = {
        email: String(user.email) ?? '',
        password: String(user.user_metadata.mobile) ?? '',
      }

      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup/', formData, { withCredentials: true });
        if (response.data.success) {
          await login(
            {
              email: String(user.email) ?? '',
              password: String(user.user_metadata.mobile) ?? '',
            }
          )
        }
      } catch (error) {
        console.log('An error occurred during sign up.', error);
      }


    };

    fetchSession();
  }, []);



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