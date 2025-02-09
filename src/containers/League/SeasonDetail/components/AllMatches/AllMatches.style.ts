import { Avatar, Tag as AntDTag } from 'antd';
import styled from 'styled-components';

import { IThemeProps } from '../../../../../theme/theme';

export const AvatarIcon = styled(Avatar)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Tag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent70};
  border: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 14px;
`;
