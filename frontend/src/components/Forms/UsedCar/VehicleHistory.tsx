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
    if (isFormIncomplete) {
      setError("Please fill in all the required fields");
  
      return;
    }
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
        [formData, 'vehicleHistory']
      );
      if (response.data.message) {
        await saveDraft('vehicleHistoryFormData', formData);
      }
    } catch (error) {
      console.error(error);
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
          <Button children={undefined} text="Save" colors={darkPrimary} onClick={handleSave} disabled={isFormIncomplete}/>
        </div>
      </div>
    </div>
  );
};

export default VehicleHistory;
