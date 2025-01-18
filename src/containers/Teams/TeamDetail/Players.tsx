import React from 'react';

import { Flex } from 'antd';
import avatar from 'src/assets/avatars/avatar_us_web.webp';

import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';

import * as S from './Players.style';

export interface IPlayers {
  key: string;
  role: string;
  userName: string;
  firstName: string;
  surName: string;
}

interface IPlayersProps {
  players: IPlayers[];
}

export const Players: React.FC<IPlayersProps> = ({ players }) => {
  return (
    <>
      <ContentLayout>
        <h3>Kapitán</h3>
        <Flex style={{ justifyContent: 'center', gap: '10px' }}>
          <S.PlayerCard>
            <S.PlayerImage src={avatar} />
            <S.PlayerInfo>
              <S.PlayerRole>{'CEO'}</S.PlayerRole>
              <S.PlayerName>{'Basccino'}</S.PlayerName>
              <S.PlayerRealName>{'Martin Chotětický'}</S.PlayerRealName>
            </S.PlayerInfo>
          </S.PlayerCard>
        </Flex>
        <h3>Členové</h3>
        <Flex style={{ justifyContent: 'center', gap: '10px' }}>
          {players.map((player, index) => (
            <S.PlayerCard key={index}>
              <S.PlayerImage src={avatar} alt={`${player.userName}`} />
              <S.PlayerInfo>
                <S.PlayerRole>{player.role}</S.PlayerRole>
                <S.PlayerName>{player.userName}</S.PlayerName>
                <S.PlayerRealName>
                  {player.firstName}&nbsp;{player.surName}
                </S.PlayerRealName>
              </S.PlayerInfo>
            </S.PlayerCard>
          ))}
        </Flex>
      </ContentLayout>
    </>
  );
};
