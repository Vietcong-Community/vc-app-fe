import { Tag as AntDTag } from 'antd';
import styled, { css } from 'styled-components';

import { MatchResult } from '../../../../../constants/enums';
import { IThemeProps } from '../../../../../theme/theme';

export const Tag = styled(AntDTag)<{ $result: MatchResult }>`
  box-sizing: border-box;
  border: none;
  font-weight: 500;
  padding: 2px 8px;
  text-transform: uppercase;
  ${(props) =>
    props.$result === MatchResult.WIN &&
    css`
      background-color: ${props.theme.mainColors.win};
      color: ${props.theme.colors.white};
    `}
  ${(props) =>
    props.$result === MatchResult.DRAW &&
    css`
      background-color: ${props.theme.mainColors.draw};
      color: ${props.theme.colors.white};
    `}
  ${(props) =>
    props.$result === MatchResult.DEFEAT &&
    css`
      background-color: ${props.theme.mainColors.defeat};
      color: ${props.theme.colors.white};
    `}
`;

interface IScoreProps {
  $isWinning: boolean;
  $isLosing: boolean;
}

export const EloPoints = styled.span<IScoreProps>`
  color: ${(props: IThemeProps) => props.theme.colors.grey};
  font-size: 14px;
  font-weight: 600;
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
