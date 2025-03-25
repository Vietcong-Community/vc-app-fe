import styled, { css } from 'styled-components';

import { BreakPoints } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.div`
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

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-justify {
    text-align: justify;
  }

  h1 {
    margin-bottom: 8px;
    margin-top: 32px;
  }

  h2 {
    margin-bottom: 8px;
    margin-top: 32px;
  }

  p {
    margin: 0;
  }
`;
