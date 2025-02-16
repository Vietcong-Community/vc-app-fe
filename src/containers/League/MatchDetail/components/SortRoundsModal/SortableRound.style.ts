import styled from 'styled-components';

import { IThemeProps } from '../../../../../theme/theme';

export const RoundContainer = styled.div`
  border-radius: 8px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent30};
  cursor: pointer;
  text-align: center;
  padding: 0.25rem 0.5rem;
`;
