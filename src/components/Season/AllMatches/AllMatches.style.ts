import { Avatar, Tag as AntDTag } from 'antd';
import styled, { css } from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

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

export const ChallengerTag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.colors.grey};
  border: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 14px;
`;

export const OpponentTag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent50};
  border: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 14px;
`;

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

interface IScoreProps {
  $isWinning: boolean;
  $isLosing: boolean;
}

export const EloPoints = styled.span<IScoreProps>`
  color: ${(props: IThemeProps) => props.theme.colors.grey};
  font-size: 12px;
  ${(props: IThemeProps & IScoreProps) =>
    props.$isWinning &&
    css`
      color: ${props.theme.colors.green};
    `};
  ${(props: IThemeProps & IScoreProps) =>
    props.$isLosing &&
    css`
      color: ${props.theme.colors.red};
    `};
`;

export const LadderTableLabel = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

export const LadderTableValue = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-weight: 600;
`;
