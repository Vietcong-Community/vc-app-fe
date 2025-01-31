import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const Icons = styled.div`
  display: flex;
  gap: 16px;
  font-size: 18px;
  justify-content: center;
  width: 100%;

  svg {
    cursor: pointer;
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  }
`;
