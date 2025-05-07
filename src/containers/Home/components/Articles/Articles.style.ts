import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../theme/theme';
import { makeMediaQuery } from '../../../../utils/mediaQuery';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const NewestArticle = styled.div`
  flex: 1.5;

  ${() => makeMediaQuery(BreakPoints.xl)`
    ${css`
      flex: 1;
    `}
  `};
`;

export const OtherArticles = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 2rem;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      flex-direction: column;
    `}
  `};

  > * {
    width: calc(100% / 3 - 1rem);

    ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      width: 100%;
    `}
  `};
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: start;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 16px;
    `}
  `};
`;

export const Perex = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: start;
  white-space: pre-line;
`;

export const Image = styled.img`
  aspect-ratio: 3/2;
  border-radius: 8px;
  float: left;
  margin-bottom: 1rem;
  margin-right: 1rem;
  width: 35%;

  ${() => makeMediaQuery(BreakPoints.xl)`
    ${css`
      width: 40%;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      width: 40%;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      float: none;
      width: 100%;
    `}
  `};
`;

export const OtherArticleImage = styled.img`
  aspect-ratio: 3/2;
  border-radius: 8px;
  float: left;
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 40%;

  ${() => makeMediaQuery(BreakPoints.xl)`
    ${css`
      width: 100%;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      width: 40%;
    `}
  `};
`;

export const MetaInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CommentCount = styled.div`
  align-items: center;
  display: inline;
  justify-content: left;
  gap: 4px;

  svg {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  }
`;
