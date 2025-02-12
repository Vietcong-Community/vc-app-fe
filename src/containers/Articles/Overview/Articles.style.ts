import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const ArticlesContainer = styled.div`
  margin: 0 auto;
  width: 60%;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      width: 100%;
    `}
  `};
`;
