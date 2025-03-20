import React, { CSSProperties, ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
  children: ReactNode;
  customStyle?: CSSProperties;
  isOpen: boolean;
  onExitComplete?: () => void;
  transition?: CSSProperties;
}

export const AnimatedWidthContainer: React.FC<IProps> = (props) => {
  const { children, customStyle, isOpen, onExitComplete, transition = { duration: 0.3 } } = props;

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          style={{ overflow: 'hidden', ...customStyle }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
