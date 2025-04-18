import React, { useState } from 'react';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';

const PricingInfo: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants;

  const [formData, setFormData] = useState({
    resalePrice: ''
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const resetForm = () => {
    setFormData({
      resalePrice: '' // Reset resalePrice field
    });
  };

  return (
    <div className={styles.vehicleDetails}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">Pricing Information</h1>
          <p className="text-gray-600">
            Enter the resale price for the vehicle.
          </p>
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
          <Button children={<ReplayIcon />} text="Reset" colors={primary} onClick={resetForm}></Button>
          <Button children={undefined} text="Save" colors={darkPrimary}></Button>
        </div>
      </div>
    </div>
  );
}
export default PricingInfo;
