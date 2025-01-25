import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PlayerInfo = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: center;
      flex-direction: column;
    `}
  `};
`;

export const Description = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  max-width: ${BreakPoints.md}px;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: center;
      flex-direction: column;
    `}
  `};
`;

export const Nickname = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 22px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
`;

export const PersonName = styled.div`
  font-size: 14px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.light};
`;

export const Socials = styled.div`
  align-items: center;
  display: flex;
  height: 2rem;
  gap: 0.5rem;
  justify-content: flex-start;
`;

export const IconWrapper = styled.div`
  align-items: center;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  display: flex;
  font-size: 1.5rem;
  justify-content: center;

  &:hover {
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
    font-size: 30px;
    transition: font-size 0.3s ease;
  }
`;
