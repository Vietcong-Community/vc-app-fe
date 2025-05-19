import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const BoldColoredText = styled.b`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const Content = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: center;
  width: 100%;

  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }

  iframe {
    aspect-ratio: 5.5/3;
    width: 70%;

    ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      width: 100%;
    `}
  `};
  }
`;

export const Images = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: auto;
  max-width: 800px;
  width: 100%;

  div {
    width: 100%;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;
