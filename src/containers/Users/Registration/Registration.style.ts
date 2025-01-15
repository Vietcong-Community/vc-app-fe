import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const Email = styled.b`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-weight: 600;
  word-break: break-word;
`;

export const Image = styled.img`
  max-width: 400px;
  width: 100%;
`;
