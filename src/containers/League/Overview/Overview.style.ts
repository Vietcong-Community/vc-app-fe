import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const SeasonsContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;
