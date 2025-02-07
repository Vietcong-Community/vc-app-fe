import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const SeasonInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: start;
      flex-direction: column;
      gap: 12px;
      justify-content: start;
    `}
  `};
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  margin-top: 0;
  text-align: center;
`;

export const InformationLabel = styled.span`
  font-size: 13px;
`;

export const InformationValue = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 15px;
  font-weight: 600;
`;

export const Matches = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const NoFinishedMatches = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: auto;

  span {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
    font-size: 24px;
  }
`;
