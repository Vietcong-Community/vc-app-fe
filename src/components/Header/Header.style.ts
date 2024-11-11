import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.header`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between; /* Zajistí, že mezi levým, středním a pravým obsahem bude prostor */
  padding: 0 24px;
  background-color: ${(props: IThemeProps) => props.theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 4.4rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      height: 3.4rem;
    `}
  `};
`;

export const LeftSection = styled.div`
  display: flex;
  justify-content: flex-start; /* Ujistí se, že logo bude vlevo */
  align-items: center;
  height: 100%;
`;

export const Logo = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
`;

export const RightSection = styled.div`
  display: flex;
  justify-content: flex-end; /* Ujistí se, že prvky vpravo budou na pravé straně */
  align-items: center;
`;
