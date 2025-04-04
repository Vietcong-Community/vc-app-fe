import styled from 'styled-components';

import { IThemeProps } from '../../../../../theme/theme';

export const ValueLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

export const Value = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 14px;
  font-weight: 600;
`;
