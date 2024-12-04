import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: ${BreakPoints.xl}px;
  margin: 0 auto;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.xl)`
    ${css`
      padding: 0 1rem;
    `}
  `};
`;
