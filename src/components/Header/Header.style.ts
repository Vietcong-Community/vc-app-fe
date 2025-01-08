import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.header`
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

export const Content = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 4.4rem;
  justify-content: space-between; /* Zajistí, že mezi levým, středním a pravým obsahem bude prostor */
  margin: 0 auto;
  max-width: ${(props: IThemeProps) => props.theme.sizes.maxPageWidth};
  padding: 0 1.5rem;
  width: 100%;
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
  flex-shrink: 0;
`;

export const RightSection = styled.div`
  display: flex;
  justify-content: flex-end; /* Ujistí se, že prvky vpravo budou na pravé straně */
  align-items: center;
`;
