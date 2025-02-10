import styled, { css } from 'styled-components';

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
