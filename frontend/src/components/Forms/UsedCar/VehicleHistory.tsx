import React, { useEffect, useState } from 'react';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import ConfirmModal from '../../Common/Modals/ConfirmModal';
import ErrorModal from '../../Common/Modals/ErrorModal';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
import { clearDraft, loadDraft, saveDraft } from '../../../utils/indexedDBUtils';
import axios from 'axios';
import { useForm } from '../../../context/UsedCarFormContext';

const VehicleHistory: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants;

  // State for form data fields
  const [formData, setFormData] = useState({
    previousOwners: '',
    distanceDriven: '',
    serviceHistory: '',
    lastServiceDate: '',
    accidentHistory: ''
  });

  // Check if any form field is empty
  const isFormIncomplete = Object.entries(formData).some(([_, value]) => !value);
  const { usedCarFormData } = useForm();
  // Modal and error state management
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string>("");

  // Load saved draft from IndexedDB on component mount
  useEffect(() => {
    (async () => {
      const saved = await loadDraft('vehicleHistoryFormData');
      if (saved && typeof saved === 'object') setFormData(saved);
    })();
  }, []);

  // Auto-save form data to IndexedDB whenever form data changes, with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveDraft('vehicleHistoryFormData', formData);
    }, 500);
    return () => clearTimeout(timeout);
  }, [formData]);

  // Update formData state when input fields change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset form fields and clear the saved draft
  const resetForm = async () => {
    setFormData({
      previousOwners: '',
      distanceDriven: '',
      serviceHistory: '',
      lastServiceDate: '',
      accidentHistory: ''
    });
    await clearDraft('vehicleHistoryFormData');
  };

  // Validate form completeness before opening confirmation modal
  const handleSave = async () => {
    
    {if (!usedCarFormData.vin || usedCarFormData.vin.trim() === '') {
      setError("Please fill the details of your car properly!");
      return;
    }
    if (formData.previousOwners === '0') {
      setError("Used cars must have at least one previous owner.");
      return;
    }
    if (Number(formData.distanceDriven) < 100) {
      setError("Used cars must have a distance driven greater than 100km.");
      return;
    }
    if (formData.serviceHistory.trim() === '') {
      setError("Service history cannot be empty.");
      return;
    }
    if (formData.accidentHistory.trim() === '') {
      setError("Accident history cannot be empty.");
      return;
    }
    if (formData.lastServiceDate.trim() === '') {
      setError("Last service date cannot be empty.");
      return;
    }
    if (new Date(formData.lastServiceDate) > new Date()) {
      setError("Last service date cannot be in the future.");
      return;
    }
    if (new Date(formData.lastServiceDate) < new Date('2000-01-01')) {
      setError("Last service date cannot be before 2000.");
      return;
    }
    if (new Date(formData.lastServiceDate) > new Date(usedCarFormData.year)) {
      setError("Last service date cannot be after the car's manufacturing year.");
      return;
    }
    if (new Date(formData.lastServiceDate) < new Date(usedCarFormData.year - 10)) {
      setError("Last service date cannot be more than 10 years before the car's manufacturing year.");
      return;
    }
    if (Number(formData.distanceDriven) > 1000000) {
      setError("Distance driven cannot exceed 1,000,000 km.");
      return;
    }
    if (Number(formData.previousOwners) > 10) {
      setError("Number of previous owners cannot exceed 10.");
      return;
    }
    if (Number(formData.previousOwners) < 0) {
      setError("Number of previous owners cannot be negative.");
      return;
    }
    if (Number(formData.distanceDriven) < 0) {
      setError("Distance driven cannot be negative.");
      return;
    }
    if (isFormIncomplete) {
      setError("Please fill in all the required fields");
      return;
    }}
    setShowConfirmation(true);
    setError('');
  };

  // Handle user confirmation: if confirmed, send form data to server and save draft
  const handleConfirm = async (confirmed: boolean) => {
    setShowConfirmation(false);
    if (!confirmed) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/abstract/addUsedCar',
        {
          formData,
          type: 'vehicleHistory',
          VIN: usedCarFormData.vin
        }
      );
      if (response.data.message) {
        await saveDraft('vehicleHistoryFormData', formData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error || 'An error occurred while saving the data');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className={styles.vehicleHistory}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">Car Usage Information</h1>
          <p className="text-gray-600">
            Fill in the past usage and service records of the vehicle
          </p>
          {showConfirmation && (
            <ConfirmModal
              msgHead="Ready to Save?"
              msgTitle="Are you sure you want to save the data?"
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
            <Button children={<AddIcon />} colors={darkPrimary}></Button>
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

      </div>
      <div>
        <div className="space-x-4">
          <Button text="Reset" colors={primary} onClick={resetForm}><ReplayIcon /></Button>
          <Button children={undefined} text="Save" colors={darkPrimary} onClick={handleSave} disabled={isFormIncomplete} />
        </div>
      </div>
    </div>
  );
};

export default VehicleHistory;
