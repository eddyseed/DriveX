import React, { useState } from 'react';
import styles from '../../assets/styles/Components/AuthPage.module.scss';
import InputField from '../../components/UI/atoms/InputField';
import Button from '../../components/UI/atoms/Button';

import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import AppleIcon from '@mui/icons-material/Apple';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useColorContext } from '../../context/ColorContext';
import { Link, useNavigate } from 'react-router-dom';
import signInPhoto from '../../assets/images/SignIn.png';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAuth } from '../../context/AuthContext';
const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });
  const [error, setError] = useState<string>("");

  const { colors } = useColorContext();
  const { primary, secondary, darkSecondary } = colors.variants;
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(formData); // ⬅ login using context
      alert("Login Successful");
      navigate("/");
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err?.response?.data?.message || "Unknown error occurred.");
    }
  };

  return (
    <div className={`${styles.AUTH_CONTAINER}`}>
      <main className='car-banner montserrat-ff'>
        <div style={{ "--bg-img": `url(${signInPhoto})` } as React.CSSProperties}>
          <div className='bg-black bg-opacity-50 flex flex-col h-full w-full px-5 py-10 space-y-5'>
            <div> <Button colors={primary} onClick={(e) => { }} text='Back To Home' to='/'><KeyboardBackspaceIcon /></Button></div>
            <div>
            <Link to="/" className='bungee-tint-regular text-4xl'>DriveX</Link>
            </div>
            <div className='text-white text-3xl font-semibold'>Your Ultimate Car Marketplace</div>
          </div>
        </div>
      </main>

      <main className={`${styles.AUTH_BOX}`}>
        {/* Sign Up Box Text Headings */}
        <div>
          <header className='text-2xl montserrat-ff flex items-end'>
          {/* <Link to="/" className='bungee-tint-regular'>DriveX</Link> */}
          </header>
          <header className=' text-3xl font-semibold montserrat-ff flex items-end'>Welcome Back User</header>
          <span className=' text-sm'>Please enter your details to sign in. • Don't have an account? <a href='/user/signup/' className='font-semibold underline'>Sign In</a></span>
        </div>

        {/* Firebase Authentication Icons and OR Divider */}
        <div>
          <div>
            <div className='flex items-center space-x-3'>
              <Button colors={secondary} text='Continue With Apple'>{<AppleIcon />}</Button>
              <Button colors={darkSecondary} text='Continue With Google'>{<GoogleIcon />}</Button>
              <Button colors={secondary} text='Continue With Twitter'>{<TwitterIcon />}</Button>

            </div>
            <div className=''>
              <section><div></div></section>
              <section><div>OR</div></section>
              <section><div></div></section>
            </div>
          </div>
          {/* Input Fields and Submit Button */}
          <div>
            <div className='flex items-center'>
              {/* Error Messsage box */}
              {error && <div className='bg-red-600 rounded-lg px-5 h-2/5 w-3/5 flex items-center text-white'>{<DangerousIcon />}{error}!</div>}
            </div>

            <div className="grid grid-cols-2">
              <div className='space-y-1'>
                <label htmlFor="email">Enter Email*</label>
                <InputField name='email' id='email' placeholder='Enter an email address...' onChange={handleChange} type='email' required value={formData.email} />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className='space-y-1'>
                <label htmlFor="password">Enter Password*</label>
                <InputField name='password' id='password' placeholder='Create a strong password...' onChange={handleChange} type='password' required value={formData.password} />
              </div>
            </div>

          </div>
        </div>
        {/* Terms and Conditions Checkbox and Submit Button */}
        <div className='grid grid-cols-2'>
          <div className='flex items-center space-x-2'>
            <input type="checkbox" id="terms" name="terms" required onChange={handleChange} />
            <label htmlFor="terms" className='select-none'>Remember Me</label>
          </div>
          <div className='flex items-center space-x-2 justify-end'>

            <Button colors={secondary} onClick={(e) => { e.preventDefault(); handleSubmit(); }}>Sign In</Button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
