import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const CardTitle = styled.h3`
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

export const Icon = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  font-size: 20px;
  font-weight: bold;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  > * {
    width: calc(25% - 12px);
  }

  ${() => makeMediaQuery(1100)`
    ${css`
      > * {
        width: calc(50% - 8px);
      }
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      > * {
        width: 100%;
      }
    `}
  `};
`;

export const HighlightItem = styled.div`
  align-items: start;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary10};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  position: relative;
`;

export const ItemName = styled.div`
  align-items: center;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
`;

export const ItemDescription = styled.div`
  font-size: 12px;
`;

export const Count = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 26px;
  font-weight: bold;
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const Player = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 8px;
  justify-content: start;
  width: fit-content;
`;
