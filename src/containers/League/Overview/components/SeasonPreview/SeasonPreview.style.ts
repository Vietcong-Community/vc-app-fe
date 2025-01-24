import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Matches = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;

  > * {
    width: 100%;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const LastMatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      padding: 0;
    `}
  `};
`;

export const TableContainer = styled.div`
  width: 100%;
  .ant-table-thead .ant-table-cell {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary30};
  }
`;
