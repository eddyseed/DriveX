import React, { useEffect, useState } from 'react';
import styles from '../../../assets/styles/Components/Forms/UsedCar.module.scss';
import InputField from '../../UI/atoms/InputField';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import ReplayIcon from '@mui/icons-material/Replay';
import { clearDraft, loadDraft, saveDraft } from '../../../utils/indexedDBUtils';

const UploadDocs: React.FC = () => {
  const { colors } = useColorContext();
  const { primary, darkPrimary } = colors.variants;

  const [formData, setFormData] = useState({
    rc: null,
    insurancePolicy: null,
    pucCertificate: null,
    panCard: null,
    addressProof: null,
    form29And30: null,
    saleAgreement: null,
    roadTaxReceipt: null,
  });
  // Load draft on component mount
  useEffect(() => {
    (async () => {
      const saved = await loadDraft('uploadDocFormData');
      if (saved && typeof saved === 'object') setFormData(saved);
    })();
  }, []);

  // Save draft when formData changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveDraft('uploadDocFormData', formData);
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const resetForm = async () => {
    setFormData({
      rc: null,
      insurancePolicy: null,
      pucCertificate: null,
      panCard: null,
      addressProof: null,
      form29And30: null,
      saleAgreement: null,
      roadTaxReceipt: null,
    });
    await clearDraft('uploadDocFormData');
  };

  return (
    <div className={styles.vehicleDetails}>
      <div>
        <header>
          <h1 className="text-2xl font-bold">Upload Documents</h1>
          <p className="text-gray-600">
            Upload the required documents for verification.
          </p>
        </header>
      </div>


      <div>
        <div>
          <section>
            <label htmlFor="rc">Registration Certificate (RC)</label>
            <InputField
              type="file"
              id="rc"
              className="w-full"
              required
              name="rc"
              onChange={handleFileChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="insurancePolicy">Insurance Policy</label>
            <InputField
              type="file"
              id="insurancePolicy"
              className="w-full"
              required
              name="insurancePolicy"
              onChange={handleFileChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="pucCertificate">PUC Certificate</label>
            <InputField
              type="file"
              id="pucCertificate"
              className="w-full"
              required
              name="pucCertificate"
              onChange={handleFileChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="panCard">PAN Card Copy of Seller</label>
            <InputField
              type="file"
              id="panCard"
              className="w-full"
              required
              name="panCard"
              onChange={handleFileChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="addressProof">Address Proof of Seller</label>
            <InputField
              type="file"
              id="addressProof"
              className="w-full"
              required
              name="addressProof"
              onChange={handleFileChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="form29And30">Form 29 and 30 (Notice + Transfer)</label>
            <InputField
              type="file"
              id="form29And30"
              className="w-full"
              required
              name="form29And30"
              onChange={handleFileChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="saleAgreement">Sale Agreement</label>
            <InputField
              type="file"
              id="saleAgreement"
              className="w-full"
              required
              name="saleAgreement"
              onChange={handleFileChange}
            />
          </section>
        </div>
        <div>
          <section>
            <label htmlFor="roadTaxReceipt">Road Tax Receipt</label>
            <InputField
              type="file"
              id="roadTaxReceipt"
              className="w-full"
              required
              name="roadTaxReceipt"
              onChange={handleFileChange}
            />
          </section>
        </div>
      </div>
      <div className="space-x-4">
        <Button children={<ReplayIcon />} text="Reset" colors={primary} onClick={resetForm}></Button>
        <Button children={undefined} text="Save" colors={darkPrimary}></Button>
      </div>
    </div>
  );
};

export default UploadDocs;
