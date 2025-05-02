import React, { useEffect } from 'react';
import styles from '../../../assets/styles/Components/Modals.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useColorContext } from '../../../context/ColorContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../UI/atoms/Button';
import { Cancel } from '@mui/icons-material';
interface ConfirmModalProps {
  msgHead: string;
  msgTitle: string;
  visible: boolean;
  onConfirm: (confirmed: boolean) => void;
  onClose: () => void;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  msgHead, msgTitle, visible,onConfirm, onClose
}) => {
  const { colors } = useColorContext();
  const { darkSecondary } = colors.variants;
  // useEffect(() => {
  //   if (!visible) return;

  //   const timer = setTimeout(() => {
  //     onClose();
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [visible, onClose]);
  if (!visible) return null
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          className={`${styles.CONFIRM_MODAL}`}
        >
          <section className="grid grid-rows-2">
            <div className='text-green-500 font-semibold flex items-end uppercase'>
              {msgHead}
            </div>
            <div>
              {msgTitle}
            </div>
            <div className='space-x-3 flex items-center'>
              <Button colors={darkSecondary} text='Yes' onClick={()=>{onConfirm(true); onClose()}}><CheckCircleIcon /></Button>
              <Button colors={darkSecondary} text='No' onClick={()=>{onConfirm(false); onClose()}}><CancelIcon/></Button>
            </div>
          </section>
          <section>
            {/* <Button colors={successGreen} onClick={onClose}>
              <CancelIcon />
            </Button> */}
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;