import styled, { css, keyframes } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

// Definice animace
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ClipPath = styled.div`
  align-items: center;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  clip-path: polygon(0% 0%, 100% 25%, 100% 100%, 0 100%);
  color: white;
  display: flex;
  height: 300px;
  justify-content: center;
  margin-bottom: -20px;
  position: relative;
  width: 100%;

  @media (min-width: 1980px) {
    display: none;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: none;
    `}
  `};
`;

export const LoginText = styled.div`
  color: #fff; /* Nastavte vhodnou barvu textu */
  font-size: 28px;
`;

export const SlideIn = styled.div`
  opacity: 0;
  transform: translateX(-100%);
  animation: ${slideIn} 1s ease-out forwards; /* Nastavení animace */
  margin: 10px 0;
`;

export const Image = styled.img`
  height: auto;
  max-width: 100%;
  position: absolute;
  left: 20%;
  bottom: -60px;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      left: 10%;
    `}
  `};
`;
