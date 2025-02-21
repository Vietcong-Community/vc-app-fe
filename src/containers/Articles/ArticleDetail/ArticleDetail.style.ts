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

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  cursor: pointer;
  font-size: 18px;
  font-weight: normal;
`;
