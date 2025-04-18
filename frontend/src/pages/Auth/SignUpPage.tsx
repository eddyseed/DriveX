import React, { useState } from 'react';
import styles from '../../assets/styles/Components/AuthPage.module.scss';
import InputField from '../../components/UI/atoms/InputField';
import Button from '../../components/UI/atoms/Button';

import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import AppleIcon from '@mui/icons-material/Apple';
import DangerousIcon from '@mui/icons-material/Dangerous';
import axios from 'axios';
import { useColorContext } from '../../context/ColorContext';
import { Link, useNavigate } from 'react-router-dom';
import signUpPhoto from '../../assets/images/SignUp.png';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ErrorModal from '../../components/Common/Modals/ErrorModal';
const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    terms: false,

  });
  const { colors } = useColorContext();
  const { primary, darkPrimary, darkSecondary } = colors.variants;
  const navigate = useNavigate()
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(''); // Reset error message
    // Check for empty fields first
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setError("Please enter a valid mobile number");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate role
    const validRoles = ['customer', 'seller', 'admin'];
    if (!validRoles.includes(formData.role)) {
      setError("Please select a valid role");
      return;
    }

    // Check terms acceptance
    if (!formData.terms) {
      setError("Please accept the terms and conditions");
      return;
    }

    //Add if all fields are properly filled and valid then remove error first
    setError('');
    // TODO: Add sign-up logic here
    console.log('Sign up data:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup/', formData, { withCredentials: true });
      console.log('Response:', response.data);
      if (response.data.success) {
        alert('Sign up successful!');
        // Redirect to login or home page
        navigate('/user/login')
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('An error occurred during sign up.');

    }

  };

  return (
    <div className={`${styles.AUTH_CONTAINER}`}>
      <main className='car-banner montserrat-ff'>
        <div style={{ "--bg-img": `url(${signUpPhoto})` } as React.CSSProperties}>
          <div className='bg-black bg-opacity-50 flex flex-col h-full w-full px-5 py-10 space-y-5'>
            <div> <Button colors={primary} onClick={(e) => { }} text='Back To Home' to='/'><KeyboardBackspaceIcon /></Button></div>
            <div className='text-white text-3xl font-semibold'>
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
            {/* <Link to="/" className='bungee-tint-regular text-4xl'>DriveX</Link> */}
          </header>
          <header className=' text-3xl font-semibold montserrat-ff flex items-end'>Create a New Account</header>
          <span className=' text-sm'>Please enter your details to sign up. • Already have an account? <a href='/user/login/' className='font-semibold underline'>Sign In</a></span>
        </div>

        {/* Firebase Authentication Icons and OR Divider */}
        <div>
          <div>
            <div className='flex items-center space-x-3'>
              <Button colors={darkPrimary} text='Continue With Apple'>{<AppleIcon />}</Button>
              <Button colors={darkSecondary} text='Continue With Google'>{<GoogleIcon />}</Button>
              <Button colors={darkPrimary} text='Continue With Twitter'>{<TwitterIcon />}</Button>

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
              {error && <ErrorModal errorHead={'Failure in Sign Up :('} visible={true} onClose={() => setError('')} errorMsg={error} />}
            </div>
            <div className="grid grid-cols-2">
              <div className='space-y-1'>
                <label htmlFor="name">Enter Name*</label>
                <InputField name='name' id='name' placeholder='Enter your name...' onChange={handleChange} type='text' required value={formData.name} />
              </div>
              <div className='space-y-1'>
                <label htmlFor="mobile">Enter Mobile Number*</label>
                <InputField name='mobile' id='mobile' placeholder='Enter your mobile number...' onChange={handleChange} type='tel' required value={formData.mobile} />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className='space-y-1'>
                <label htmlFor="email">Enter Email*</label>
                <InputField name='email' id='email' placeholder='Enter an email address...' onChange={handleChange} type='email' required value={formData.email} />
              </div>
              <div className='space-y-1'>
                <label htmlFor="role">Select Role*</label>
                <select
                  className='w-full h-2/5 border-2 border-gray-300 rounded-md'
                  name="role"
                  id="role"
                  onChange={handleChange}
                  value={formData.role}
                  required
                >
                  <option value="">Select Role...</option>
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className='space-y-1'>
                <label htmlFor="password">Enter Password*</label>
                <InputField name='password' id='password' placeholder='Create a strong password...' onChange={handleChange} type='password' required value={formData.password} />
              </div>
              <div className='space-y-1'>
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <InputField name='confirmPassword' id='confirmPassword' placeholder='Retype the password...' onChange={handleChange} type='password' required value={formData.confirmPassword} />
              </div>
            </div>

          </div>
        </div>
        {/* Terms and Conditions Checkbox and Submit Button */}
        <div className='grid grid-cols-2'>
          <div className='flex items-center space-x-2'>
            <input type="checkbox" id="terms" name="terms" required onChange={handleChange} />
            <label htmlFor="terms" className='select-none'>I agree to the <a href="https://www.github.com/eddyseed/E_Commerce_Cars/" target='_blank' rel='noreferrer' className='underline'>Terms and Conditions</a></label>
          </div>
          <div className='flex items-center space-x-2 justify-end'>

            <Button disabled={
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword ||
              !formData.mobile ||
              !formData.name ||
              !formData.role ||
              !formData.terms
            } onClick={(e) => { e.preventDefault(); handleSubmit(); }}>Register</Button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;

