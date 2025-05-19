import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const Content = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: center;
  width: 100%;

  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }
`;

export const AccountLink = styled.b`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const Acknowledgment = styled.b`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 20px;
`;
