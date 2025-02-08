import { Tag as AntDTag } from 'antd';
import styled, { css } from 'styled-components';

import { MatchResult } from '../../../../../constants/enums';

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
