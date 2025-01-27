import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const MatchInformationContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 2;
  width: 100%;
`;

export const InformationLabel = styled.span`
  font-size: 14px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.normal};
`;

export const InformationValue = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 18px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
`;

export const Score = styled.div`
  flex: 1;
  font-size: 26px;
  font-weight: 600;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: none;
    `}
  `};
`;

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;
