import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const ClipPath = styled.div`
  position: relative;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  width: 100%;
  height: auto;
  clip-path: polygon(0% 0%, 100% 15%, 100% 85%, 0 100%);
  color: white;
`;
