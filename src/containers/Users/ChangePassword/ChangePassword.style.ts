import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const LinkButton = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  cursor: pointer;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  text-decoration: underline;
`;
