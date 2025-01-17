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

export const LinkButton = styled.div`
  cursor: pointer;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  font-size: 12px;
  text-decoration: underline;
`;
