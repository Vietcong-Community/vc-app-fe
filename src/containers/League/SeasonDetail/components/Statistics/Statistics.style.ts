import { Avatar, Tag as AntDTag } from 'antd';
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

export const AvatarIcon = styled(Avatar)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Tag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent50};
  border: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 15px;
  padding: 0.25rem 0.5rem;

  svg {
    color: ${(props: IThemeProps) => props.theme.colors.black};
    font-size: 14px;
  }
`;

export const PlayerTag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent70};
  border: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 15px;
  padding: 0.25rem 0.5rem;

  svg {
    color: ${(props: IThemeProps) => props.theme.colors.black};
    font-size: 14px;
  }
`;

export const TeamTag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  border: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 15px;
  padding: 0.25rem 0.5rem;

  svg {
    color: ${(props: IThemeProps) => props.theme.colors.black};
    font-size: 14px;
  }
`;
