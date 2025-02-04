import styled, { css } from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const LinkButton = styled.div<{ $withScale: boolean }>`
  cursor: pointer;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  font-size: 12px;
  text-decoration: underline;

  ${(props) =>
    props.$withScale &&
    css`
      &:hover {
        transform: scale(1.05);
      }
    `}
`;
