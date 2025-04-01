import { Tag } from 'antd';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

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
  position: relative;

  &:hover {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.accent30};
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

export const LeftColumn = styled.div`
  align-items: start;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  justify-content: start;
`;

export const RightColumn = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
`;

export const MatchTags = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 4px;

  svg {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: none;
    `}
  `};
`;

export const MatchStatusTag = styled(Tag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary30};
  border: none;
  color: ${(props: IThemeProps) => props.theme.mainColors.text};
`;

export const LiveTag = styled(Tag)`
  animation: blinker 2s linear infinite;
  @keyframes blinker {
    50% {
      opacity: 0.25;
    }
  }
`;

export const LiveTagMobile = styled.div`
  top: 0.5rem;
  display: none;
  position: absolute;
  right: 0;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: flex;
    `}
  `};
`;

export const Comments = styled.div`
  bottom: 0.5rem;
  display: none;
  position: absolute;
  right: 0.5rem;

  svg {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: flex;
      gap: 4px;
    `}
  `};
`;
