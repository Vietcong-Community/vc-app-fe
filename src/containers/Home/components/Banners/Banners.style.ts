import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../theme/theme';
import { makeMediaQuery } from '../../../../utils/mediaQuery';

export const LeagueBanner = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  border-radius: 128px 32px 32px;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  padding: 2rem 6rem;
  text-align: start;
  width: 100%;
  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      border-radius: 100px 24px 24px;
      padding: 2rem 4rem;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      border-radius: 60px 16px 16px;
      padding: 2rem;
    `}
  `};
`;
export const RankedBanner = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary60};
  border-radius: 32px 32px 128px 32px;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  padding: 2rem 6rem;
  text-align: start;
  width: 100%;
  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      border-radius: 24px 24px 100px 24px;
      padding: 2rem 4rem;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      border-radius: 16px 16px 60px 16px;
      padding: 2rem;
    `}
  `};
`;

export const ChampionshipBanner = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent60};
  border-radius: 32px 32px 32px 128px;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  padding: 2rem 4rem 2rem 6rem;
  text-align: start;
  width: 100%;

  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      border-radius: 24px 24px 24px 100px;
      padding: 2rem 3rem 2rem 4rem;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      border-radius: 16px 16px 16px 60px;
      padding: 2rem;
    `}
  `};
`;

export const JoinBanner = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  border-radius: 32px 128px 32px 32px;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  padding: 2rem 6rem 2rem 4rem;
  text-align: start;
  width: 100%;

  a {
    color: ${(props: IThemeProps) => props.theme.colors.white};
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      border-radius: 24px 100px 24px 24px;
      padding: 2rem 4rem 2rem 3rem;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      border-radius: 16px 60px 16px 16px;
      padding: 2rem;
    `}
  `};
`;

export const OtherBanners = styled.div`
  display: flex;
  gap: 32px;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const DiscordContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;

  a {
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  }
`;
