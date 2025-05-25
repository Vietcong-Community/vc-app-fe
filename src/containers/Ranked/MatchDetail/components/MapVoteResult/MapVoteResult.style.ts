import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Subtitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  margin: 8px 0;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 18px;
    `}
  `};
`;

export const MapVotes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const MapVote = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: 4px;
  text-align: start;
  width: 100%;
`;
