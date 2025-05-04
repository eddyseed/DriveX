import React, { useState } from 'react';
import { useForm } from '../../../context/UsedCarFormContext';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import ConfirmModal from '../../Common/Modals/ConfirmModal';
import ErrorModal from '../../Common/Modals/ErrorModal';
import axios from 'axios';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
const FinalOverview: React.FC = () => {
  const { usedCarFormData } = useForm();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<{
    confirmation: boolean;
  }>({
    confirmation: false,
  });

  const navigator = useNavigate();
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isFormIncomplete = Object.entries(formData).some(([_, value]) => !value);
  const resetForm = async () => {
    setFormData({
      confirmation: false,
    });
  };
  const handleSave = async () => {
    if (isFormIncomplete) {
      setError("Please fill in all the required fields"); 
      return;
    }
    if (!usedCarFormData.vin || usedCarFormData.vin.trim() === '') {
      setError("Please fill the details of your car properly!");
      return;
    }
    setShowConfirmation(true);
    setError('')
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async (confirmed: boolean) => {
    setShowConfirmation(false);
    if (!confirmed) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/abstract/addUsedCar',
        {
          formData,
          type: 'confirmation',
          VIN: usedCarFormData.vin,
        }
      );
      if (response.data.message) {
        navigator('/',{ state: { carAdded: true } });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.confirmationPage}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">Final Overview & Confirmation</h1>
          <p className="text-gray-600">
            This is the FINAL STEP. Please review all the information you have provided before confirming.

          </p>
          {showConfirmation && (
            <ConfirmModal
              msgHead="Ready to Sell?"
              msgTitle="Are you sure you mark this car for sale?"
              visible={true}
              onConfirm={handleConfirm}
              onClose={() => setShowConfirmation(false)}
            />
          )}
          {error && <ErrorModal head={'Incomplete Form Detected!'} visible={true} onClose={() => setError('')} msg={error} />
          }
        </header>
      </div>
      <div>
        <div>
          <section className='!w-full flex items-center'>
            <ul className='list-disc pl-6'>
              <li>Are you sure to mark your car for sale?</li>
            </ul>
          </section>
        </div>
        <div className='space-y-1 h-[30vh] flex align-center jusitfy-center flex-col'>
          <label htmlFor="confirmation">Choose your decision*</label>
          <select
            className='w-full h-1/5 border-2 border-gray-300 rounded-md'
            name="confirmation"
            id="confirmation"
            onChange={handleChange}
            value={String(formData.confirmation)}
            required
          >
            <option value="">Select your decision</option>
            <option value={"true"}>Yes, I agree my car will be available on DriveX for sale.</option>
            <option value="false">No, I just want to stash on the DriveX for future sale.</option>
          </select>
        </div>
      </div>
      <div className='space-x-4'>
        <Button text="Reset" colors={primary} onClick={resetForm}><ReplayIcon /></Button>
        <Button children={undefined} text="Save" colors={darkPrimary} onClick={handleSave} disabled={isFormIncomplete} />
      </div>
    </div>
  );
};

export default FinalOverview;