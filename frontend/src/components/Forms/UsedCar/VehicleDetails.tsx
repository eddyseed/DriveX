import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';
import { clearDraft, loadDraft, saveDraft } from '../../../utils/indexedDBUtils';
import ConfirmModal from '../../Common/Modals/ConfirmModal';
import ErrorModal from '../../Common/Modals/ErrorModal';

const VehicleDetails: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants;

  const [formData, setFormData] = useState({
    vin: '',
    producer: '',
    modelName: '',
    makeYear: '',
    category: '',
    fuelType: '',
    transmission: '',
    engineDisplacement: '',
    torque: '',
    horsepower: '',
    mileage: '',
    color: '',
    seatingCapacity: '',
    noOfCylinders: '',
    rtoLocation: '',
    topSpeed: '',
    driveType: '',
    maxPower: '',
    maxTorque: '',
    valvesPerCylinder: '',
    valveConfiguration: '',
    fuelSupplySystem: '',
    turboCharger: '',
    gearbox: '',
    fuelTankCapacity: '',
    emissionNormCompliance: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isFormIncomplete = Object.entries(formData).some(([_, value]) => !value);
  const [error, setError] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  {
    // Load draft on component mount
    useEffect(() => {
      (async () => {
        const saved = await loadDraft('vehicleDetailInfo');
        if (saved && typeof saved === 'object') setFormData(saved);
      })();
    }, []);

    // Save draft when formData changes
    useEffect(() => {
      const timeout = setTimeout(() => {
        saveDraft('vehicleDetailInfo', formData);
      }, 500);

      return () => clearTimeout(timeout);
    }, [formData]);
  }

  const resetForm = async () => {
    setFormData({
      vin: '',
      producer: '',
      modelName: '',
      makeYear: '',
      category: '',
      fuelType: '',
      transmission: '',
      engineDisplacement: '',
      torque: '',
      horsepower: '',
      mileage: '',
      color: '',
      seatingCapacity: '',
      noOfCylinders: '',
      rtoLocation: '',
      topSpeed: '',
      driveType: '',
      maxPower: '',
      maxTorque: '',
      valvesPerCylinder: '',
      valveConfiguration: '',
      fuelSupplySystem: '',
      turboCharger: '',
      gearbox: '',
      fuelTankCapacity: '',
      emissionNormCompliance: '',
    });
    await clearDraft('vehicleDetailInfo');
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
        [formData, 'vehicleDetails']
      );
      if (response.data.message) {
        await saveDraft('vehicleDetailsFormData', formData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.vehicleDetails}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">Vehicle Information</h1>
          <p className="text-gray-600">
            Fill in the specifications of the vehicle.
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
          <section className='!w-full flex items-center'>
            <ul className='list-disc pl-6'>
              <li>The Vehicle Identification Number (VIN) should match the High-Security Registration Plate (HSRP) details to ensure accuracy and compliance with regulations.</li>
            </ul>
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="vin">Vehicle Identification Number</label>
            <InputField
              type="text"
              id="vin"
              placeholder="e.g. DL-8CAR-3049"
              className="w-full"
              required
              name="vin"
              value={formData.vin}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="producer">Producer</label>
            <InputField
              type="text"
              id="producer"
              placeholder="e.g. Hyundai"
              className="w-full"
              required
              name="producer"
              value={formData.producer}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="modelName">Model Name</label>
            <InputField
              type="text"
              id="modelName"
              placeholder="e.g. Grand i10"
              className="w-full"
              required
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="rtoLocation">RTO Location</label>
            <InputField
              type="text"
              id="rtoLocation"
              placeholder="e.g. Delhi RTO"
              className="w-full"
              name="rtoLocation"
              value={formData.rtoLocation}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="makeYear">Year of Manufacture</label>
            <InputField
              type="number"
              id="makeYear"
              placeholder="Enter year of manufacturing"
              className="w-full"
              required
              name="makeYear"
              value={formData.makeYear}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="category">Category</label>
            <InputField
              type="text"
              id="category"
              placeholder="e.g. Sedan, SUV"
              className="w-full"
              required
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </section>
        </div>

        <div>
          <section>
            <label htmlFor="fuelType">Fuel Type</label>
            <InputField
              type="text"
              id="fuelType"
              placeholder="e.g. Petrol, Diesel"
              className="w-full"
              required
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="fuelTankCapacity">Fuel Tank Capacity</label>
            <InputField
              type="text"
              id="fuelTankCapacity"
              placeholder="e.g. 35 Litres"
              className="w-full"
              name="fuelTankCapacity"
              value={formData.fuelTankCapacity}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="fuelSupplySystem">Fuel Supply System</label>
            <InputField
              type="text"
              id="fuelSupplySystem"
              placeholder="e.g. MPFI"
              className="w-full"
              name="fuelSupplySystem"
              value={formData.fuelSupplySystem}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section className='!w-full flex items-center'>
            <ul className='list-disc pl-6'>
              <li>If the car is equipped with dual power systems like Petrol + CNG, ensure that both systems are properly documented and compliant with regulations.</li>
            </ul>
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="engineDisplacement">Engine Displacement</label>
            <InputField
              type="text"
              id="engineDisplacement"
              placeholder="e.g. 1200cc"
              className="w-full"
              required
              name="engineDisplacement"
              value={formData.engineDisplacement}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="torque">Torque</label>
            <InputField
              type="text"
              id="torque"
              placeholder="e.g. 113Nm"
              className="w-full"
              required
              name="torque"
              value={formData.torque}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="horsepower">Horsepower</label>
            <InputField
              type="text"
              id="horsepower"
              placeholder="e.g. 83hp"
              className="w-full"
              required
              name="horsepower"
              value={formData.horsepower}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="mileage">Mileage</label>
            <InputField
              type="number"
              id="mileage"
              placeholder="e.g. 18 km/l"
              className="w-full"
              required
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="noOfCylinders">No. of Cylinders Equipped</label>
            <InputField
              type="number"
              id="cylinders"
              placeholder="e.g. 3 cylidres"
              className="w-full"
              required
              name="noOfCylinders"
              value={formData.noOfCylinders}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="seatingCapacity">Seating Capacity</label>
            <InputField
              type="number"
              id="seatingCapacity"
              placeholder="e.g. 5"
              className="w-full"
              required
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section className='!w-full flex items-center'>
            <ul className='list-disc pl-6'>
              <li>If the color is customly modified, it must be RTO approved, and the relevant documents should be attached properly.</li>
            </ul>
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="color">Color</label>
            <InputField
              type="text"
              id="color"
              placeholder="e.g. Red, Blue"
              className="w-full"
              required
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="transmission">Transmission</label>
            <InputField
              type="text"
              id="transmission"
              placeholder="e.g. Manual, Automatic"
              className="w-full"
              required
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="gearbox">Gearbox</label>
            <InputField
              type="text"
              id="gearbox"
              placeholder="e.g. 5-speed"
              className="w-full"
              name="gearbox"
              value={formData.gearbox}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="topSpeed">Top Speed</label>
            <InputField
              type="text"
              id="topSpeed"
              placeholder="e.g. 180 km/h"
              className="w-full"
              name="topSpeed"
              value={formData.topSpeed}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="driveType">Drive Type</label>
            <InputField
              type="text"
              id="driveType"
              placeholder="e.g. AWD, FWD, RWD"
              className="w-full"
              name="driveType"
              value={formData.driveType}
              onChange={handleChange}
            />
          </section>

        </div>
        <div>
          <section>
            <label htmlFor="maxPower">Max Power</label>
            <InputField
              type="text"
              id="maxPower"
              placeholder="e.g. 110 bhp @ 6000 rpm"
              className="w-full"
              name="maxPower"
              value={formData.maxPower}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="maxTorque">Max Torque</label>
            <InputField
              type="text"
              id="maxTorque"
              placeholder="e.g. 170 Nm @ 4000 rpm"
              className="w-full"
              name="maxTorque"
              value={formData.maxTorque}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="valvesPerCylinder">Valves Per Cylinder</label>
            <InputField
              type="number"
              id="valvesPerCylinder"
              placeholder="e.g. 4"
              className="w-full"
              name="valvesPerCylinder"
              value={formData.valvesPerCylinder}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="valveConfiguration">Valve Configuration</label>
            <InputField
              type="text"
              id="valveConfiguration"
              placeholder="e.g. DOHC, SOHC"
              className="w-full"
              name="valveConfiguration"
              value={formData.valveConfiguration}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="turboCharger">Turbo Charger</label>
            <InputField
              type="text"
              id="turboCharger"
              placeholder="Yes / No"
              className="w-full"
              name="turboCharger"
              value={formData.turboCharger}
              onChange={handleChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="emissionNormCompliance">Emission Norm Compliance</label>
            <InputField
              type="text"
              id="emissionNormCompliance"
              placeholder="e.g. BS6"
              className="w-full"
              name="emissionNormCompliance"
              value={formData.emissionNormCompliance}
              onChange={handleChange}
            />
          </section>
        </div>
      </div>
      <div className="space-x-4">
        <Button text="Reset" colors={primary} onClick={resetForm}><ReplayIcon /></Button>
        <Button children={undefined} text="Save" colors={darkPrimary} onClick={() => handleSave} disabled={isFormIncomplete} />
      </div>
    </div>
  );
};

export default VehicleDetails;
