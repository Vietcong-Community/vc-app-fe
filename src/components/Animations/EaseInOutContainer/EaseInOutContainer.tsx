import React, { CSSProperties, ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  onExitComplete?: () => void;
  transition?: CSSProperties;
}

export const EaseInOutContainer: React.FC<IProps> = (props) => {
  const { children, isOpen, onExitComplete, transition = { ease: 'easeIn', duration: 0.3 } } = props;

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          style={{ width: '100%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
