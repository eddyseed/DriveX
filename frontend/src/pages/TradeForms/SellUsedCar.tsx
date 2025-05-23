import React, { useState } from 'react';
import styles from '../../assets/styles/Components/Forms/UsedCar.module.scss'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import OwnerInfo from '../../components/Forms/UsedCar/OwnerInfo';
import VehicleHistory from '../../components/Forms/UsedCar/VehicleHistory';
import VehicleDetails from '../../components/Forms/UsedCar/VehicleDetails';
import PricingInfo from '../../components/Forms/UsedCar/PricingInfo';
import FinalOverview from '../../components/Forms/UsedCar/FinalOverview';
import { FormProvider } from '../../context/UsedCarFormContext';

const SellUsedCar: React.FC = () => {
  const [activeForm, setActiveForm] = useState(0);
  const allForms = [
    {
      title: "Owner Information",
      description: "Provide details about the car owner",
      icon: <AccountCircleOutlinedIcon />
    },
    
    {
      title: "Vehicle Specifications",
      description: "Provide detailed specifications of the vehicle",
      icon: <DirectionsCarFilledOutlinedIcon />
    },
    {
      title: "Vehicle History",
      description: "Provide the history of the vehicle",
      icon: <HistoryOutlinedIcon />
    },
    // {
    //   title: "Identity Verification",
    //   description: "Verify the identity of the car owner",
    //   icon: <VerifiedOutlinedIcon />
    // },
    // {
    //   title: "Document Upload",
    //   description: "Upload necessary documents for verification",
    //   icon: <DocumentScannerOutlinedIcon />
    // },
    {
      title: "Pricing Details",
      description: "Provide pricing information for the vehicle",
      icon: <MonetizationOnOutlinedIcon />
    },
    {
      title: "Final Review",
      description: "Review all the provided information",
      icon: <DoneOutlineOutlinedIcon />
    },
  ]
  const formComponents = [
    <OwnerInfo />,
    <VehicleDetails />,
    <VehicleHistory />,
    // <IDVerification />,
    // <UploadDocs />,
    <PricingInfo />,
    <FinalOverview />
  ]
  return (
    <div className={`${styles.USED_CAR}`}>
      <FormProvider>
        <div className="p-4 flex flex-col gap-y-3">
          {Array.from(allForms).map((item, index) => {
            return (
              <div
                key={index}
                title={item.description}
                className={`flex items-center space-x-2 ${index === activeForm ? '!border-2 !border-[#48bf84] !border-solid' : ''}`}
                onClick={() => setActiveForm(index)}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
        <div className="p-4">
          {formComponents[activeForm]}
        </div>
      </FormProvider>
    </div>
  );
};

export default SellUsedCar;