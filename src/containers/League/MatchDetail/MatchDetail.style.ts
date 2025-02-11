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

export const MiddleContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-weight: 600;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: none;
    `}
  `};
`;

export const MobileResultContent = styled.div`
  display: none;
  flex-direction: column;
  font-size: 22px;
  font-weight: 600;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: flex;
    `}
  `};
`;

export const DesktopScore = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex: 1;
  font-size: 26px;
  font-weight: 600;
  gap: 8px;
`;

export const MobileScore = styled.div`
  align-items: center;
  display: none;
  justify-content: center;
  flex: 1;
  font-size: 26px;
  font-weight: 600;
  gap: 8px;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: flex;
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

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

interface IScoreProps {
  $isWinning: boolean;
  $isLosing: boolean;
}

export const EloPoints = styled.div<IScoreProps>`
  color: ${(props: IThemeProps) => props.theme.colors.grey};
  font-size: 16px;
  ${(props: IThemeProps & IScoreProps) =>
    props.$isWinning &&
    css`
      color: ${props.theme.colors.green};
    `};
  ${(props: IThemeProps & IScoreProps) =>
    props.$isLosing &&
    css`
      color: ${props.theme.colors.red};
    `};
`;
