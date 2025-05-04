import React, { useState } from 'react';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from 'axios';
import ConfirmModal from '../../Common/Modals/ConfirmModal';
import ErrorModal from '../../Common/Modals/ErrorModal';
import { useForm } from '../../../context/UsedCarFormContext';
const PricingInfo: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants;
  const [formData, setFormData] = useState({
    resalePrice: ''
  });
  const { usedCarFormData } = useForm();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isFormIncomplete = Object.entries(formData).some(([_, value]) => !value);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    if (isFormIncomplete) {
      setError("Please fill in all the required fields");

      return;
    }
    setShowConfirmation(true);
    setError('')
  };

  const resetForm = () => {
    setFormData({
      resalePrice: ''
    });
  };
  const handleConfirm = async (confirmed: boolean) => {
    setShowConfirmation(false);
    if (!confirmed) return;

    try {
      const response = await axios.post('http://localhost:5000/api/abstract/addUsedCar', {
        formData,
        type: 'vehiclePricingInfo',
        VIN: usedCarFormData.vin,
      });
      if (response.data.message) {
        //True
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.vehicleDetails}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">Pricing Information</h1>
          <p className="text-gray-600">
            Enter the resale price for the vehicle.
          </p>
          {showConfirmation && (
            <ConfirmModal
              msgHead="Ready to Sell?"
              msgTitle="Are you sure you about the price?"
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
          <section>
            <label htmlFor="resalePrice">Resale Price</label>
            <InputField
              type="number"
              id="resalePrice"
              placeholder="Enter Resale Price"
              className="w-full"
              required
              name="resalePrice"
              value={formData.resalePrice || ''}
              onChange={handleChange}
            />
          </section>
        </div>

      </div>
      <div>
        <div className="space-x-4">
          <Button text="Reset" colors={primary} onClick={resetForm}><ReplayIcon /></Button>
          <Button children={undefined} text="Save" colors={darkPrimary} disabled={isFormIncomplete} onClick={handleSave}/>
        </div>
      </div>
    </div>
  );
}
export default PricingInfo;
