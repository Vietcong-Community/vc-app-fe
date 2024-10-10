import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.div`
  align-items: center;
  background-color: ${(props: IThemeProps) => props.theme.colors.white};
  height: 4.4rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100; // left panel has z-index 99 and menu popup has to flow over it
  display: flex;
  justify-content: center;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      height: 3.4rem;
    `}
  `};
`;
