import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const LinkButton = styled.div`
  cursor: pointer;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  font-size: 12px;
  text-decoration: underline;
`;
