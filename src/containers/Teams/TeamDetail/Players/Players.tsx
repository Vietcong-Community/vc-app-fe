import React from 'react';

import { Carousel } from 'antd';
import { FormattedMessage } from 'react-intl';
import avatar from 'src/assets/avatars/avatar_us_web.webp';

import { ContentLayout } from '../../../../components/Layouts/ContentLayout/ContentLayout';

import { messages } from './messages';

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
        <h3>
          <FormattedMessage {...messages.title} />
        </h3>
        <S.PlayerContainer>
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
              {/*
              <S.PlayerInvite>
                <Button><CheckOutlined style={{ fontSize:'15px'}}/></Button>
                <Button><StopOutlined /></Button>
              </S.PlayerInvite>
              */}
            </S.PlayerCard>
          ))}
        </S.PlayerContainer>
        <S.CarouselDiv>
          <Carousel
            arrows
            key={players.length}
            infinite={false}
            slidesToShow={1}
            slidesToScroll={1}
            dotPosition="bottom"
          >
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
          </Carousel>
        </S.CarouselDiv>
      </ContentLayout>
    </>
  );
};
