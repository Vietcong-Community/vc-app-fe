import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
`;

export const Link = styled.div`
  display: inline;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  }

  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: ${(props: IThemeProps) => props.theme.mainColors.accent};
    }
  }
`;

export const Image = styled.img`
  height: auto;
  max-width: 100%;
  padding-left: 50px;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      padding-left: 40px;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      padding-left: 30px;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      padding-left: 20px;
    `}
  `};
`;
