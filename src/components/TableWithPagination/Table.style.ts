import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const TableContainer = styled.div`
  width: 100%;
  .ant-table-thead .ant-table-cell {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary30};
  }
  th.ant-table-column-sort {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary30} !important;
  }
`;
