import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: ${(props: IThemeProps) => props.theme.breakpoints.xl}px;
  margin: 0 auto;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.xl)`
    ${css`
      padding: 0 1rem;
    `}
  `};
`;
