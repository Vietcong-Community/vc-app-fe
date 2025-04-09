import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Container = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  justify-items: center;
  gap: 1rem;
`;

export const MatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;

  > div {
    width: calc(100% / 3 - 12px);

    ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      width: calc(100% / 2 - 8px);
    `}
  `};

    ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      width: 100%;
    `}
  `};
  }
`;
