import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from './theme/theme';
import { makeMediaQuery } from './utils/mediaQuery';

export const AppContainer = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
  color: ${(props: IThemeProps) => props.theme.mainColors.text};
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', serif;
  font-size: ${(props: IThemeProps) => props.theme.fontSize.normal};
  font-style: normal;
  font-stretch: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 1.67;
  margin: 0;
  max-width: 100%;
  min-height: 100vh;
  padding: 0;
  position: relative;
  text-align: center;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 14px;
    `}
  `};
`;
