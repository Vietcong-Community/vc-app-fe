import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const RoundContainer = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary30};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 1rem;
  position: relative;
  text-align: start;
  width: 100%;
`;

export const MapTitle = styled.div`
  font-size: 16px;
  font-weight: 600;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 14px;
    `}
  `};
`;

export const WinnerTag = styled.div<{ $isDraw: boolean }>`
  border-radius: 4px;
  background-color: ${(props: IThemeProps & { $isDraw: boolean }) =>
    props.$isDraw ? '#808080' : props.theme.colors.green};
  font-size: 12px;
  padding: 0 0.25rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
