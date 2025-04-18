import React, { useEffect } from 'react';
import styles from '../../../assets/styles/Components/Modals.module.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import { useColorContext } from '../../../context/ColorContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../UI/atoms/Button';
interface SuccessModalProps {
  successHead: string;
  successMsg: string;
  visible: boolean;
  onClose: () => void;
}
const SuccesModal: React.FC<SuccessModalProps> = ({
  successHead, successMsg, visible, onClose
}) => {
  const { colors } = useColorContext();
  const { successGreen } = colors.variants;
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);
  if (!visible) return null
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          className={`${styles.SUCCESS_MODAL}`}
        >
          <section className="grid grid-rows-2">
            <div className='text-green-500 font-semibold flex items-end uppercase'>
              {successHead}
            </div>
            <div className='text-white'>
              {successMsg}
            </div>
          </section>
          <section>
            <Button colors={successGreen} onClick={onClose}>
              <CancelIcon />
            </Button>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccesModal;