import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.div<{ $showAfterLoad: boolean }>`
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;

  ${(props: { $showAfterLoad: boolean }) =>
    props.$showAfterLoad &&
    css`
      display: initial;
    `}
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  pointer-events: all;
  opacity: 0.3;
`;

export const Body = styled(motion.div)<{ width: number }>`
  position: relative;
  z-index: 1;
  pointer-events: all;
  background-color: ${(props) => props.theme.mainColors.background};
  height: 100%;
  max-width: ${({ width }) => `${width}px`};
  box-sizing: border-box;
  right: 0;

  padding-top: 71px;
`;

export const CloseButton = styled.div`
  color: ${(props) => props.theme.mainColors.accent};
  cursor: pointer;
  margin-top: 6px;
  font-size: 25px;
`;

export const Header = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

export const OverflowContainer = styled.div<{ $maxWidth: number }>`
  overflow: auto;
  width: 100%;
  max-width: ${(props) => props.$maxWidth}px;
  height: 100%;
  padding: 0 60px 50px 60px;

  /* Firefox */
  scrollbar-color: ${(props: IThemeProps) => `${props.theme.mainColors.accent} ${props.theme.mainColors.background}`};
  scrollbar-width: thin;
  /* WebKit and Chromiums */
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props: IThemeProps) => props.theme.mainColors.accent};
    border-radius: 5px;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      padding: 0 30px 50px 30px;
    `}
  `};
`;
