import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const MapsContainer = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: row;
    `}
  `};
`;

export const Map = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  img {
    border-radius: 8px;
    width: 100%;
  }
`;

export const MapName = styled.div`
  color: yellow;
  font-size: 18px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  user-select: none;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      bottom: 0;
    `}
  `};
`;
