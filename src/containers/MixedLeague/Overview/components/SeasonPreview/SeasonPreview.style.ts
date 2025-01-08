import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Matches = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;

  > * {
    width: 100%;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;
