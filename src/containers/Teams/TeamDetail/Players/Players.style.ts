import bgCard from 'src/assets/heli-footer1.webp';
import styled from 'styled-components';

import { IThemeProps } from '../../../../theme/theme';

export const PlayerCard = styled.div`
  width: 400px;
  height: 120px;
  background-image: url(${bgCard});
  background-size: 200%;
  background-position: top right;
  align-items: center; /* Vertikální zarovnání na střed */
  margin: 5px 0;
  margin-left: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  filter: grayscale(80%); /* Obrázek bude šedý */
  transition: filter 0.3s ease; /* Plynulý přechod mezi stavy */

  &:hover {
    filter: grayscale(0%); /* Obrázek bude barevný při hoveru */
    transform: scale(1.03);
    cursor: pointer;
  }
`;

export const PlayerImage = styled.img`
  width: 120px; /* Šířka obrázku */
  height: 120px; /* Výška obrázku */
  border-radius: 2%;
  object-fit: cover; /* Přizpůsobení obsahu */
  margin-right: 40px;
`;

export const PlayerInfo = styled.div`
  padding: 15px;
`;

export const PlayerName = styled.h3`
  margin: 5px 0;
  font-size: 18px;
  font-weight: bold;
  color: ${(props: IThemeProps) => props.theme.mainColors.background};
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
