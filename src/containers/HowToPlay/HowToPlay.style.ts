import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const BoldColoredText = styled.b`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const Content = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: center;
  width: 100%;

  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }
`;
