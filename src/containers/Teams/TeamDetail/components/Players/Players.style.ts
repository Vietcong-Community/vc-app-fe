import { Avatar } from 'antd';
import bgCard from 'src/assets/heli-footer-light-design.webp';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Container = styled.div`
  width: 100%;
`;

export const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const PlayerCard = styled.div`
  align-items: center; /* Vertikální zarovnání na střed */
  background-image: url(${bgCard});
  background-size: 200%;
  background-position: top right;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  position: relative;
  filter: grayscale(80%); /* Obrázek bude šedý */
  height: 120px;
  transition: filter 0.3s ease; /* Plynulý přechod mezi stavy */
  width: 100%;

  &:hover {
    cursor: pointer;
    filter: grayscale(0%); /* Obrázek bude barevný při hoveru */
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      cursor: pointer;
      filter: grayscale(0%); /* Obrázek bude barevný při hoveru */
    `}
  `};
`;

export const PlayerImage = styled.img`
  width: 120px; /* Šířka obrázku */
  height: 120px; /* Výška obrázku */
  border-radius: 2%;
  object-fit: cover; /* Přizpůsobení obsahu */

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      height: 100px; /* Výška obrázku */
      width: 100px; /* Šířka obrázku */
    `}
  `};
`;

export const PlayerInfo = styled.div`
  right: 1rem;
  padding: 15px;
  top: 0;
  width: 100%;
`;

export const PlayerName = styled.h3`
  margin: 5px 0;
  font-size: 18px;
  font-weight: bold;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const PlayerRealName = styled.p`
  margin: 0;
  font-size: 16px;
  color: #8b8c89;
`;

export const PlayerRole = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  color: #8b8c89;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  button {
    padding: 0.5rem 1rem;
  }
`;

export const Icon = styled(Avatar)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  cursor: pointer;
  filter: grayscale(80%); /* Obrázek bude šedý */

  &:hover {
    cursor: pointer;
    filter: grayscale(0%); /* Obrázek bude barevný při hoveru */
    transform: scale(1.2);
  }
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;
