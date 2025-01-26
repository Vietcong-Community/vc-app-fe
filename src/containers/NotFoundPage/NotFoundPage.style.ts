import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

export const IconContainer = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  font-size: 50px;
`;
