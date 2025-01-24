import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const TeamLabel = styled.div`
  font-size: 20px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 16px;
    `}
  `};
`;

export const TeamTag = styled.div`
  border-radius: 8px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent40};

  font-size: 16px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  padding: 0.25rem 0.5rem;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 16px;
    `}
  `};
`;

export const TeamInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
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
