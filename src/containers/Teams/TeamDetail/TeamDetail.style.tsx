import { Avatar } from 'antd';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const Content = styled.div`
  display: flex;
  justify-content: space-between; /* Rozdělí podřazené divy na levou a pravou stranu */
  align-items: flex-start; /* Zarovná podřazené divy nahoru */
  gap: 20px; /* Mezera mezi podřazenými divy */

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const TeamInfo = styled.div`
  flex: 2;
  border-radius: 8px;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      flex: 1;
    `}
  `};
`;

export const Members = styled.div`
  flex: 1;
  width: 100%;
`;

export const AvatarIcon = styled(Avatar)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;
