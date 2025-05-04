import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReplayIcon from '@mui/icons-material/Replay';

import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import ConfirmModal from '../../Common/Modals/ConfirmModal';
import ErrorModal from '../../Common/Modals/ErrorModal';
import { useColorContext } from '../../../context/ColorContext';
import { clearDraft, loadDraft, saveDraft } from '../../../utils/indexedDBUtils';

const OwnerInfo: React.FC = () => {
  // Context colors
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants;

  // State: form data
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    altMobileNumber: '',
    dateOfBirth: '',
    address: ''
  });

  // State: modals and errors
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string>("");

  // Validation: required fields
  const ignoredFields = ['middleName', 'altMobileNumber'];
  const isFormIncomplete = Object.entries(formData)
    .filter(([key]) => !ignoredFields.includes(key))
    .some(([_, value]) => !value);

  // Load draft on mount
  useEffect(() => {
    (async () => {
      const saved = await loadDraft('ownerInfo');
      if (saved && typeof saved === 'object') setFormData(saved);
    })();
  }, []);

  // Auto-save to IndexedDB on formData changes (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveDraft('ownerInfo', formData);
    }, 500);
    return () => clearTimeout(timeout);
  }, [formData]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSave = async () => {
    if (isFormIncomplete) {
      setError("Please fill in all the required fields");
      return;
    }
    setShowConfirmation(true);
    setError('');
  };

  const handleConfirm = async (confirmed: boolean) => {
    setShowConfirmation(false);
    if (!confirmed) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/abstract/addUsedCar',
        {
          formData,
          type: 'ownerData',
        }
      );
      if (response.data.message) {
        await saveDraft('ownerInfo', formData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // JSX
  return (
    <div className={styles.ownerInfoForm}>
      {/* Header */}
      <div>
        <header className="h-full">
          <h1 className="text-2xl font-bold">Owner Information</h1>
          <p className="text-gray-600">Provide details about the car owner</p>

          {showConfirmation && (
            <ConfirmModal
              msgHead="Ready to Save?"
              msgTitle="Are you sure you want to save the data?"
              visible={true}
              onConfirm={handleConfirm}
              onClose={() => setShowConfirmation(false)}
            />
          )}

          {error && (
            <ErrorModal
              head="Incomplete Form Detected!"
              visible={true}
              onClose={() => setError('')}
              msg={error}
            />
          )}
        </header>
      </div>

      {/* Form Fields */}
      <div>
        {/* Name Rules */}
        <div>
          <ul className="list-disc pl-10">
            <li>The name must match exactly as printed on the <span className="font-semibold">Aadhaar Card</span> (including spelling and initials).</li>
            <li>No nicknames, abbreviations, or aliases are allowed.</li>
          </ul>
        </div>

        {/* Name Fields */}
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

        {/* Mobile Rules */}
        <div>
          <ul className="list-disc pl-10">
            <li>Primary mobile number must be linked to the <span className="font-semibold">Aadhaar Card</span></li>
            <li>The number should be active and capable of receiving OTPs (for verification).</li>
          </ul>
        </div>

        {/* Mobile Fields */}
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

        {/* DOB Rules */}
        <div>
          <ul className="list-disc pl-10">
            <li>The <span className="font-semibold">Date of Birth</span> must match official records per the <span className="font-semibold">Aadhaar Card</span>.</li>
            <li>Ensure the date is accurate to avoid verification issues.</li>
          </ul>
        </div>

        {/* DOB Field */}
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

        {/* Address Rules */}
        <div>
          <ul className="list-disc pl-10">
            <li>The <span className="font-semibold">Permanent Address</span> must match official records per the <span className="font-semibold">Aadhaar Card</span>.</li>
            <li>Ensure accuracy to avoid verification discrepancies.</li>
          </ul>
        </div>

        {/* Address Field */}
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

      {/* Action Buttons */}
      <div className="space-x-4">
        <Button text="Reset" colors={primary} onClick={resetForm}>
          <ReplayIcon />
        </Button>
        <Button
          text="Save"
          colors={darkPrimary}
          onClick={handleSave}
          disabled={isFormIncomplete}
          children={undefined}
        />
      </div>
    </div>
  );
};

export default OwnerInfo;
