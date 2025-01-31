import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const RoundContainer = styled.div`
  border-radius: 8px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary30};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`;

export const MapTitle = styled.div`
  text-align: start;
`;

export const TeamsContainer = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 1rem;
`;

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      button {
        width: 100%;
      }
    `}
  `};
`;

export const OverallScore = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  justify-content: center;
`;

interface IScoreProps {
  $isWinning: boolean;
  $isLosing: boolean;
}

export const Score = styled.div<IScoreProps>`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 2px 8px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 0.5rem;
  width: 100%;

  span {
    font-size: 18px;
  }

  ${(props: IThemeProps & IScoreProps) =>
    props.$isWinning &&
    css`
      background-color: ${props.theme.colors.green};
    `};
  ${(props: IThemeProps & IScoreProps) =>
    props.$isLosing &&
    css`
      background-color: ${props.theme.colors.red};
    `};
`;
