import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const Container = styled.div`
  width: 100%;
`;

export const Icon = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  font-size: 20px;
  font-weight: bold;
`;
