import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const ArticlesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;

  > * {
    width: calc(50% - 8px);
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      width: 100%;
    `}
  `};
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
`;

export const Categories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: start;
  width: 200px;
`;

export const NoArticles = styled.div`
  display: block;
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
`;
