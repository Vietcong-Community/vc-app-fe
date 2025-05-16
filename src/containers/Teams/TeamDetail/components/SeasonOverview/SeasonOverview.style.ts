import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const SeasonTitle = styled.h3`
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  text-align: start;
  line-height: 1.2;
  margin: 8px 0;
  width: fit-content;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 20px;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      font-size: 18px;
    `}
  `};

  &:hover {
    text-decoration: underline;
  }
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: start;
  line-height: 1.2;
  margin: 12px 0;
`;
