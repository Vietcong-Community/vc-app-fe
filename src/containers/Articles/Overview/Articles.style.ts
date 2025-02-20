import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const ArticlesContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;

  > * {
    width: calc(50% - 12px);
    ${() => makeMediaQuery(BreakPoints.md)`
      ${css`
        width: 100%;
      `}
  `};
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

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      display: none;
    `}
  `};
`;

export const MobileCategories = styled.div`
  display: none;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `}
  `};
`;

export const FilterButton = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.mainColors.accent45};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 0.5rem 1rem;
  width: fit-content;
`;

export const NoArticles = styled.div`
  display: block;
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
`;
