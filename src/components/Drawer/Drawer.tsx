import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, useAnimation } from 'motion/react';

import { useWindowDimensions } from '../../hooks/WindowDimensionsHook';

import * as S from './Drawer.style';

interface IProps {
  drawerWidth: number;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactElement | ReactElement[];
  showHeader?: boolean;
}

export const Drawer: React.FC<IProps> = (props) => {
  const { drawerWidth, children, isOpen, onClose, showHeader = true } = props;
  const scrollableContentDivRef = useRef<HTMLDivElement>(null);

  const [withAnimation, setWithAnimation] = useState(false);

  const { width } = useWindowDimensions();

  const animation = useAnimation();

  const bodyStyles = {
    active: {
      x: width - drawerWidth,
    },
    inactive: {
      x: width + drawerWidth * 3,
    },
  };

  useEffect(() => {
    onClose();
  }, [width]);

  useEffect(() => {
    animation.start(isOpen ? 'active' : 'inactive');
  }, [isOpen, animation]);

  useEffect(() => {
    setWithAnimation(true);
  }, []);

  // Used for remove scroll from body, when drawer is open
  useEffect(() => {
    if (isOpen) {
      const scrollableDiv = scrollableContentDivRef?.current;
      if (scrollableDiv) {
        scrollableDiv.scrollTop = 0;
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <S.Container $showAfterLoad={withAnimation}>
      <AnimatePresence initial>
        {isOpen && (
          <motion.div
            initial={{ display: 'flex', flex: 1, flexDirection: 'column', opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeIn', duration: 0.2 }}
          >
            <S.Overlay onClick={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
      <S.Body
        width={width}
        animate={animation}
        variants={bodyStyles}
        transition={{ type: 'easeIn', duration: !withAnimation ? 0 : 0.2 }}
      >
        {showHeader && (
          <S.Header>
            <S.CloseButton onClick={onClose}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </S.CloseButton>
          </S.Header>
        )}
        <S.OverflowContainer ref={scrollableContentDivRef} $maxWidth={drawerWidth}>
          {children}
        </S.OverflowContainer>
      </S.Body>
    </S.Container>
  );
};
