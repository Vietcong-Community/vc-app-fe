import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const CardTitle = styled.h3`
  font-weight: 600;
  margin-top: 0;
`;

export const InformationLabel = styled.span`
  font-size: 13px;
`;

export const InformationValue = styled.span`
  color: darkolivegreen;
  font-size: 15px;
  font-weight: 600;
`;

export const Matches = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;
