import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const AlertContainer = styled.div`
  width: 100%;

  .ant-alert-message {
    color: ${(props: IThemeProps) => props.theme.colors.black};
  }
  .ant-alert-description {
    color: ${(props: IThemeProps) => props.theme.colors.black};
  }
`;
