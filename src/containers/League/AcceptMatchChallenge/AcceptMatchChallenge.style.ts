import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const ChallengerBox = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent15};
  border-radius: 8px;
  font-size: 14px;
  padding: 0.5rem;
  text-align: start;
`;
