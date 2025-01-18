import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const PlayerDiv = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
`;

export const PlayerCard = styled.div`
  width: 200px;
  background: linear-gradient(to right, ${(props: IThemeProps) => props.theme.mainColors.text}, #3e4234);
  border-radius: 10px;
  overflow: hidden;
  color: #fff;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  justify-content: center;
`;

export const PlayerImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
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
