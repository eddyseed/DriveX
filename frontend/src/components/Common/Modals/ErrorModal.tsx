import React, { useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '../../UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import styles from '../../../assets/styles/Components/Modals.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
interface ErrorModalProps {
  errorHead: string;
  errorMsg: string;
  visible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorHead, errorMsg, visible, onClose }) => {
  const { colors } = useColorContext();
  const { warningRed } = colors.variants;

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          className={`${styles.ERROR_MODAL}`}
        >
          <section className="grid grid-rows-2">
            <div className='text-red-500 font-semibold flex items-end uppercase'>
              {errorHead}
            </div>
            <div className='text-white'>
              {errorMsg}
            </div>
          </section>
          <section>
            <Button colors={warningRed} onClick={onClose}>
              <CancelIcon />
            </Button>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
