import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  margin: 8px 0;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 28px;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      font-size: 20px;
    `}
  `};
`;
