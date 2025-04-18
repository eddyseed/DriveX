import React, { useEffect, useState } from 'react';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss'
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';
import { clearDraft, loadDraft, saveDraft } from '../../../utils/indexedDBUtils';
import axios from 'axios';
const OwnerInfo: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', mobileNumber: '', altMobileNumber: '', dateOfBirth: '', address: ''
  })
  // Load draft on component mount
  useEffect(() => {
    (async () => {
      const saved = await loadDraft('ownerInfo');
      if (saved && typeof saved === 'object') setFormData(saved);
    })();
  }, []);

  // Save draft when formData changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveDraft('ownerInfo', formData);
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.mobileNumber || !formData.dateOfBirth || !formData.address) {
      alert("Please fill in all the required fields")
    }
    try {
      const response = await axios.post('http://localhost:5000/api/abstract/addUsedCar', [formData, 'owner'])



    } catch (error) {
      console.error(error)
    }


  }
  const resetForm = async () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      mobileNumber: '',
      altMobileNumber: '',
      dateOfBirth: '',
      address: ''
    });
    await clearDraft('ownerInfo');
  };
  return (
    <div className={styles.ownerInfoForm}>
      <div>
        <header className='h-full'>
          <h1 className="text-2xl font-bold">Owner Information</h1>
          <p className="text-gray-600">
            Provide details about the car owner
          </p>
        </header>
      </div>
      <div>
        <div>
          <ul className="list-disc pl-10">
            <li>
              The name must match exactly as printed on the <span className='font-semibold'>Aadhaar Card</span> (including spelling and initials).
            </li>
            <li>No nicknames, abbreviations, or aliases are allowed.</li>
          </ul>
        </div>
        <div>
          <section>
            <label htmlFor="firstName">First Name*</label>
            <InputField
              type="text"
              id="firstName"
              placeholder="First Name"
              className="w-full"
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="middleName">Middle Name</label>
            <InputField
              type="text"
              id="middleName"
              placeholder="Middle Name"
              className="w-full"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="lastName">Last Name*</label>
            <InputField
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="w-full"
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <ul className="list-disc pl-10">
            <li>
              Primary mobile number must be linked to the <span className='font-semibold'>Aadhaar Card</span>
            </li>
            <li>The number should be active and capable of receiving OTPs (for verification).</li>
          </ul>
        </div>
        <div>
          <section>
            <label htmlFor="mobileNumber">Primary Mobile Number*</label>
            <InputField
              type="tel"
              id="mobileNumber"
              placeholder="Mobile Number"
              className="w-full"
              required
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="altMobileNumber">Alternative Mobile Number</label>
            <InputField
              type="tel"
              id="altMobileNumber"
              placeholder="Alternative Mobile Number"
              className="w-full"
              name="altMobileNumber"
              value={formData.altMobileNumber}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <ul className="list-disc pl-10">
            <li>
              The <span className='font-semibold'>Date of Birth</span> must match the official records as per the <span className='font-semibold'>Aadhaar Card</span>.
            </li>
            <li>Ensure the date is accurate to avoid discrepancies during verification.</li>
          </ul>
        </div>
        <div>
          <section>
            <label htmlFor="dateOfBirth">Date of Birth*</label>
            <InputField
              type="date"
              id="dateOfBirth"
              placeholder="Date of Birth"
              className="w-full"
              required
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <ul className="list-disc pl-10">
            <li>
              The <span className='font-semibold'>Permanent Address</span> must match the official records as per the <span className='font-semibold'>Aadhaar Card</span>.
            </li>
            <li>Ensure the address is accurate to avoid discrepancies during verification.</li>
          </ul>
        </div>
        <div>
          <section>
            <label htmlFor="address">Permanent Address*</label>
            <InputField
              type="text"
              id="address"
              placeholder="Permanent Address"
              className="w-full"
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </section>
        </div>

      </div>
      <div>
        <div className="space-x-4">
          <Button children={<ReplayIcon />} text="Reset" colors={primary} onClick={resetForm}></Button>
          <Button children={undefined} text="Save" colors={darkPrimary} onClick={handleSubmit}></Button>
        </div>
      </div>
    </div>
  );
};

export default OwnerInfo;