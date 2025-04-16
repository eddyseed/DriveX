import React, { useState } from 'react';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';

const IDVerification: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, secondary } = colors.variants;

  const [formData, setFormData] = useState({
    aadharAddress: '',
    aadharOtp: '',
    phoneNumber: '',
    phoneOtp: '',
    email: '',
    emailOtp: ''
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      aadharAddress: '',
      aadharOtp: '',
      phoneNumber: '',
      phoneOtp: '',
      email: '',
      emailOtp: ''
    });
  };

  return (
    <div className={styles.IDVerification}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">ID Verification</h1>
          <p className="text-gray-600">
            Verify Your Identity Here
          </p>
        </header>
      </div>


      <div>
        <div>
          <section className='!w-full flex items-center'>
            <ul className='list-disc pl-6'>
              <li>Ensure that the Aadhar details, phone number, and email address provided are accurate and belong to you for authentic and genuine identity verification.</li>
            </ul>
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="aadharAddress">Aadhar Address</label>
            <InputField
              type="text"
              id="aadharAddress"
              placeholder="Enter Aadhar Address"
              className="w-full"
              required
              name="aadharAddress"
              value={formData.aadharAddress || ''}
              onChange={handleChange}
            />
          </section>
          <section className='flex items-center'>
            <Button children text='Send OTP'></Button>
          </section>
          <section>
            <label htmlFor="aadharOtp">Aadhar OTP</label>
            <InputField
              type="text"
              id="aadharOtp"
              placeholder="Enter OTP"
              className="w-full"
              required
              name="aadharOtp"
              value={formData.aadharOtp || ''}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="phoneNumber">Primary Phone Number</label>
            <InputField
              type="text"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              className="w-full"
              required
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
            />
          </section>
          <section className='flex items-center'>
            <Button children text='Send OTP'></Button>
          </section>
          <section>
            <label htmlFor="phoneOtp">Phone OTP</label>
            <InputField
              type="text"
              id="phoneOtp"
              placeholder="Enter OTP"
              className="w-full"
              required
              name="phoneOtp"
              value={formData.phoneOtp || ''}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="email">Email</label>
            <InputField
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full"
              required
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </section>
          <section className='flex items-center'>
            <Button children text='Send OTP'></Button>
          </section>
          <section>
            <label htmlFor="emailOtp">Email OTP</label>
            <InputField
              type="text"
              id="emailOtp"
              placeholder="Enter OTP"
              className="w-full"
              required
              name="emailOtp"
              value={formData.emailOtp || ''}
              onChange={handleChange}
            />
          </section>
        </div>

      </div>
      <div className="flex justify-end space-x-4 text-[8px]">
        <Button children={<ReplayIcon />} text="Reset" colors={primary} onClick={resetForm}></Button>
        <Button children={undefined} text="Save" colors={primary}></Button>
        <Button children={undefined} text="Continue" colors={secondary}></Button>
      </div>
    </div>
  );
};

export default IDVerification;
