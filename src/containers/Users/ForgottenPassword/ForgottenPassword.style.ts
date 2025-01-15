import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const Image = styled.img`
  max-width: 400px;
  width: 100%;
`;

export const LinkButton = styled.div`
  cursor: pointer;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  font-size: 12px;
  text-decoration: underline;

  &:hover {
    transform: scale(1.05);
  }
`;
