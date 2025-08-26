import { makeMediaQuery } from 'src/utils/mediaQuery';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';

export const TablesContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 8px;
  overflow-x: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
    border-radius: 8px;
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props: IThemeProps) => props.theme.mainColors.accent};
    border-radius: 8px;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 700px;
  text-align: start;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      min-width: initial;
    `}
  `};
`;
