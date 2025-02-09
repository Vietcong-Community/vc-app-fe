import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../theme/theme';
import { makeMediaQuery } from '../../../../utils/mediaQuery';

export const Container = styled.div`
  align-items: center;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary10};
  box-shadow:
    rgba(0, 0, 0, 0.05) 0 6px 24px 0,
    rgba(0, 0, 0, 0.08) 0 0 0 1px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.accent};
    color: ${(props: IThemeProps) => props.theme.mainColors.background};
    transform: scale(1.025);
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const Teams = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const Score = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  font-size: 18px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  justify-content: center;
  white-space: nowrap;

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      font-size: 16px;
    `}
  `};
`;

interface ITextProps {
  $isWinning: boolean;
  $isLosing: boolean;
}

export const HighlightedText = styled.span<ITextProps>`
  ${(props: IThemeProps & ITextProps) =>
    props.$isWinning &&
    css`
      font-weight: 600;
    `};
  ${(props: IThemeProps & ITextProps) =>
    props.$isLosing &&
    css`
      font-weight: 400;
    `};
`;

interface IScoreProps {
  $isWinning: boolean;
  $isLosing: boolean;
}

export const EloPoints = styled.span<IScoreProps>`
  font-size: 12px;
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
