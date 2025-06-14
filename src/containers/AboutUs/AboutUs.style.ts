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
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const SectionText = styled.div`
  flex: 1 1 50%;
  padding: 1rem;
`;

export const SectionImage = styled.img`
  height: auto;
  flex: 1 1 50%;
  border-radius: 12px;
  max-width: 40%;
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
