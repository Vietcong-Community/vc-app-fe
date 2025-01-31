import { BreakPoints, IThemeProps } from 'src/theme/theme';
import styled, { css } from 'styled-components';

import { makeMediaQuery } from '../../utils/mediaQuery';

export const Background = styled.footer<{ $image: string }>`
  background-image: url(${(props) => props.$image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: azure;
  clip-path: polygon(0 4%, 50% 0, 100% 4%, 100% 100%, 0 100%);
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      clip-path: polygon(0 1%, 50% 0, 100% 1%, 100% 100%, 0 100%);
    `}
  `};
`;

export const FooterContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  justify-content: space-between;
  padding: 1rem;
  text-align: center;
  width: 100%;

  h4 {
    font-size: 20px;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 14px;

      h4 {
        font-size: 18px;
      }
    `}
  `};
`;

export const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
      gap: 0.5rem;
    `}
  `};
`;

export const Column = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: flex-start;
    `}
  `};
`;

export const Link = styled.div`
  &:hover {
    cursor: pointer;
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: ${(props: IThemeProps) => props.theme.mainColors.accent};
    }
  }
`;

export const CopyrightAndSocialsLevel = styled.div`
  display: flex;
  font-size: 13px;
  min-height: 30px;
  justify-content: space-between;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: flex-start;
      gap: 10px;
      flex-direction: column-reverse;
    `}
  `};
`;

export const CopyRight = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 1rem;
  justify-content: center;
`;

export const Hosting = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 0.2rem;
  justify-content: left;
`;

export const Socials = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 1rem;
  justify-content: right;
`;

export const IconWrapper = styled.div`
  align-items: center;
  color: azure;
  display: flex;
  font-size: 22px;
  justify-content: center;

  &:hover {
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
    font-size: 30px;
    transition: font-size 0.3s ease;
  }
`;
