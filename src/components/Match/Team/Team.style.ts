import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const TeamLabel = styled.div`
  font-size: 20px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 16px;
    `}
  `};
`;

export const TeamTag = styled.span`
  border-radius: 8px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent40};

  font-size: 16px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  padding: 0.25rem 0.5rem;
  white-space: nowrap;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 12px;
    `}
  `};
`;

export const TeamInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: flex-start;
      flex-direction: column;
    `}
  `};
`;

export const ELO = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.normal};
  gap: 8px;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 14px;
    `}
  `};

  span {
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  }
`;

export const LineUpTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  justify-content: space-between;
  width: 100%;

  > * {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 14px;
    `}
  `};
`;

export const Icon = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  font-size: 20px;
  font-weight: bold;
`;

export const LinkButton = styled.div`
  bottom: 1rem;
  cursor: pointer;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  font-size: 12px;
  position: absolute;
  right: 1rem;
  text-decoration: underline;
  text-align: end;
`;

export const Player = styled.div`
  border-radius: 8px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary20};
  display: flex;
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  justify-content: space-between;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const LineUp = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

export const Statistics = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;

  > * {
    align-items: center;
    display: flex;
    gap: 6px;
    justify-content: flex-start;
    width: 35px;
  }
`;

export const StatisticsHint = styled.div`
  align-items: start;
  display: flex;
  gap: 8px;
  font-size: 12px;
  flex-direction: column;
`;
