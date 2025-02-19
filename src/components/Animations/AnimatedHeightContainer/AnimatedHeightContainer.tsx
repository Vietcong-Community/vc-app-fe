import React, { CSSProperties, ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  onExitComplete?: () => void;
  transition?: CSSProperties;
}

export const AnimatedHeightContainer: React.FC<IProps> = (props) => {
  const { children, isOpen, onExitComplete, transition = { duration: 0.2 } } = props;

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          style={{ overflow: 'hidden' }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
