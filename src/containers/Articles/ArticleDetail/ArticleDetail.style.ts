import { Avatar } from 'antd';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: start;
  width: 60%;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      width: 80%;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      width: 100%;
    `}
  `};
`;

export const AvatarIcon = styled(Avatar)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  cursor: pointer;
`;
