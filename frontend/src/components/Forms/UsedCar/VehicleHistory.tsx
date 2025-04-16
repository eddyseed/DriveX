import React, { useState } from 'react';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
const VehicleHistory: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, secondary } = colors.variants;
  const [formData, setFormData] = useState({
    previousOwners: '',
    distanceDriven: '',
    serviceHistory: '',
    lastServiceDate: '',
    accidentHistory: ''
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const resetForm = () => {
    setFormData({
      previousOwners: '',
      distanceDriven: '',
      serviceHistory: '',
      lastServiceDate: '',
      accidentHistory: ''
    });
  };

  return (
    <div className={styles.vehicleHistory}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">Car Usage Information</h1>
          <p className="text-gray-600">
            Fill in the past usage and service records of the vehicle
          </p>
        </header>
      </div>


      <div>
        <div>
          <section>
            <ul>
              <li>By submitting previous ownership details, the seller confirms that the information is truthful and does not violate any privacy rights under local data protection laws.</li>
            </ul>
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="previousOwners">No. of Previous Owners</label>
            <InputField
              type="number"
              id="previousOwners"
              placeholder="Number of Owners"
              className="w-full"
              required
              name="previousOwners"
              value={formData.previousOwners}
              onChange={handleChange}
            />
          </section>
          <section>
            <Button children={<AddIcon />} colors={secondary}></Button>
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="distanceDriven">Distance Driven (in Km)</label>
            <InputField
              type="number"
              id="distanceDriven"
              placeholder="Distance Driven"
              className="w-full"
              required
              name="distanceDriven"
              value={formData.distanceDriven}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="serviceHistory">Service History</label>
            <InputField
              type="text"
              id="serviceHistory"
              placeholder="Brief summary of service history"
              className="w-full"
              required
              name="serviceHistory"
              value={formData.serviceHistory}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="lastServiceDate">Last Service Date</label>
            <InputField
              type="date"
              id="lastServiceDate"
              className="w-full"
              required
              name="lastServiceDate"
              value={formData.lastServiceDate}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="accidentHistory">Accident History</label>
            <InputField
              type="text"
              id="accidentHistory"
              placeholder="Mention if any accident has occurred"
              className="w-full"
              required
              name="accidentHistory"
              value={formData.accidentHistory}
              onChange={handleChange}
            />
          </section>
        </div>
        <div className="flex justify-end space-x-4 text-[8px]">
          <Button children={<ReplayIcon />} text="Reset" colors={primary} onClick={resetForm}></Button>
          <Button children={undefined} text="Save" colors={primary}></Button>
          <Button children={undefined} text="Continue" colors={secondary}></Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleHistory;
