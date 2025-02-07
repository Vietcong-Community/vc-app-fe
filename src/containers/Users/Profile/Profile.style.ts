import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

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

  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: center;
      flex-direction: column;
    `}
  `};
`;

export const Description = styled.div`
  display: flex;
  max-width: 740px;
  text-align: start;
  width: 100%;
  white-space: pre-wrap;

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
  position: absolute;
  bottom: 24px;
  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      bottom: initial;
      position: relative;
    `}
  `};
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

export const EditProfileIcon = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
`;

export const MyTeamsTitle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 740px;
`;

export const MyTeamsContainer = styled.div`
  display: flex;
  gap: 16px;
  max-width: 740px;
  justify-content: start;
  margin: auto;
  flex-wrap: wrap;

  > * {
    width: calc(100% / 3 - 18px);
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;

      > * {
        width: 100%;
      }
    `}
  `};
`;

export const IconContainer = styled.div`
  color: ${(props) => props.theme.mainColors.accent};
  cursor: pointer;
  font-size: 24px;

  &:hover {
    transform: scale(1.2);
  }
`;
