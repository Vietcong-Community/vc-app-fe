import React from 'react';

import { Carousel } from 'antd';
import { compact } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { ITeamPlayers } from '../../../../../api/hooks/teams/interfaces';
import soldier from '../../../../../assets/teamDetail/soldier.webp';
import { Button } from '../../../../../components/Button/Button';
import { MainButtonVariant } from '../../../../../components/Button/enums';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { TeamMemberStatus, TeamRole } from '../../../../../constants/enums';
import { mapTeamRoleToTranslation } from '../../../../../utils/mappingLabelUtils';

import { messages } from './messages';

import * as S from './Players.style';

export interface IPlayer {
  key: string;
  role: TeamRole;
  nickname: string;
  firstName?: string;
  lastName?: string;
}

interface IProps {
  goToPlayerDetail: (id: string) => void;
  handleApproveRequest: (id: string) => void;
  handleRejectRequest: (id: string) => void;
  players: ITeamPlayers[];
  userIsOwner?: boolean;
}

export const Players: React.FC<IProps> = (props: IProps) => {
  const { goToPlayerDetail, handleApproveRequest, handleRejectRequest, players, userIsOwner = false } = props;

  const activeMembers = players.filter((item) => item.status === TeamMemberStatus.ACTIVE);
  const awaitingMembers = players.filter((item) => item.status === TeamMemberStatus.AWAITING);
  const removedMembers = players.filter((item) => item.status === TeamMemberStatus.REMOVED);

  const activePlayers: IPlayer[] =
    activeMembers?.map((item) => ({
      key: item.user.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const awaitingPlayers: IPlayer[] =
    awaitingMembers?.map((item) => ({
      key: item.user.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const removedPlayers: IPlayer[] =
    removedMembers?.map((item) => ({
      key: item.user.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const showAwaitingPlayers = awaitingMembers.length > 0 && userIsOwner;
  const showRemovedPlayers = removedMembers.length > 0;

  return (
    <>
      <Card>
        <S.DesktopContainer>
          <h3 style={{ margin: 0 }}>
            <FormattedMessage {...messages.activePlayersTitle} />
          </h3>
          {activePlayers.map((player, index) => {
            const realName = compact([player.firstName, player.lastName]).join(' ');
            return (
              <S.PlayerCard key={index} onClick={() => goToPlayerDetail(player.key)}>
                <S.PlayerImage src={soldier} alt={`${player.nickname}`} />
                <S.PlayerInfo>
                  <S.PlayerRole>{mapTeamRoleToTranslation(player.role)}</S.PlayerRole>
                  <S.PlayerName>{player.nickname}</S.PlayerName>
                  <S.PlayerRealName>{realName}</S.PlayerRealName>
                </S.PlayerInfo>
              </S.PlayerCard>
            );
          })}
          {showAwaitingPlayers && (
            <>
              <h3>
                <FormattedMessage {...messages.awaitingPlayersTitle} />
              </h3>
              {awaitingPlayers.map((player, index) => {
                const realName = compact([player.firstName, player.lastName]).join(' ');
                return (
                  <>
                    <S.PlayerCard key={index} onClick={() => goToPlayerDetail(player.key)}>
                      <S.PlayerImage src={soldier} alt={`${player.nickname}`} />
                      <S.PlayerInfo>
                        <S.PlayerRole>{mapTeamRoleToTranslation(player.role)}</S.PlayerRole>
                        <S.PlayerName>{player.nickname}</S.PlayerName>
                        <S.PlayerRealName>{realName}</S.PlayerRealName>
                      </S.PlayerInfo>
                    </S.PlayerCard>
                    <S.Buttons>
                      <Button onClick={() => handleRejectRequest(player.key)} variant={MainButtonVariant.OUTLINED}>
                        <FormattedMessage {...messages.rejectJoinRequest} />
                      </Button>
                      <Button onClick={() => handleApproveRequest(player.key)} variant={MainButtonVariant.PRIMARY}>
                        <FormattedMessage {...messages.approveJoinRequest} />
                      </Button>
                    </S.Buttons>
                    <Gap defaultHeight={8} />
                  </>
                );
              })}
            </>
          )}
          {showRemovedPlayers && (
            <>
              <h3>
                <FormattedMessage {...messages.removedPlayersTitle} />
              </h3>
              {removedPlayers.map((player, index) => {
                const realName = compact([player.firstName, player.lastName]).join(' ');
                return (
                  <S.PlayerCard key={index} onClick={() => goToPlayerDetail(player.key)}>
                    <S.PlayerImage src={soldier} alt={`${player.nickname}`} />
                    <S.PlayerInfo>
                      <S.PlayerRole>{mapTeamRoleToTranslation(player.role)}</S.PlayerRole>
                      <S.PlayerName>{player.nickname}</S.PlayerName>
                      <S.PlayerRealName>{realName}</S.PlayerRealName>
                    </S.PlayerInfo>
                  </S.PlayerCard>
                );
              })}
            </>
          )}
        </S.DesktopContainer>
        <S.CarouselDiv>
          <h3 style={{ margin: 0 }}>
            <FormattedMessage {...messages.activePlayersTitle} />
          </h3>
          <Gap defaultHeight={16} />
          <Carousel
            arrows
            key={players.length}
            infinite={false}
            slidesToShow={1}
            slidesToScroll={1}
            dotPosition="bottom"
          >
            {activePlayers.map((player, index) => {
              const realName = compact([player.firstName, player.lastName]).join(' ');
              return (
                <S.PlayerCard key={index} onClick={() => goToPlayerDetail(player.key)}>
                  <S.PlayerImage src={soldier} alt={player.nickname} />
                  <S.PlayerInfo>
                    <S.PlayerRole>{mapTeamRoleToTranslation(player.role)}</S.PlayerRole>
                    <S.PlayerName>{player.nickname}</S.PlayerName>
                    <S.PlayerRealName>{realName}</S.PlayerRealName>
                  </S.PlayerInfo>
                </S.PlayerCard>
              );
            })}
          </Carousel>
          {showAwaitingPlayers && (
            <>
              <Gap defaultHeight={32} />
              <h3 style={{ margin: 0 }}>
                <FormattedMessage {...messages.awaitingPlayersTitle} />
              </h3>
              <Gap defaultHeight={16} />
              <Carousel
                arrows
                key={players.length}
                infinite={false}
                slidesToShow={1}
                slidesToScroll={1}
                dotPosition="bottom"
              >
                {awaitingPlayers.map((player, index) => {
                  const realName = compact([player.firstName, player.lastName]).join(' ');
                  return (
                    <S.PlayerCard key={index} onClick={() => goToPlayerDetail(player.key)}>
                      <S.PlayerImage src={soldier} alt={player.nickname} />
                      <S.PlayerInfo>
                        <S.PlayerRole>{mapTeamRoleToTranslation(player.role)}</S.PlayerRole>
                        <S.PlayerName>{player.nickname}</S.PlayerName>
                        <S.PlayerRealName>{realName}</S.PlayerRealName>
                      </S.PlayerInfo>
                    </S.PlayerCard>
                  );
                })}
              </Carousel>
            </>
          )}
          {showRemovedPlayers && (
            <>
              <Gap defaultHeight={32} />
              <h3 style={{ margin: 0 }}>
                <FormattedMessage {...messages.removedPlayersTitle} />
              </h3>
              <Gap defaultHeight={16} />
              <Carousel
                arrows
                key={players.length}
                infinite={false}
                slidesToShow={1}
                slidesToScroll={1}
                dotPosition="bottom"
              >
                {removedPlayers.map((player, index) => {
                  const realName = compact([player.firstName, player.lastName]).join(' ');
                  return (
                    <S.PlayerCard key={index} onClick={() => goToPlayerDetail(player.key)}>
                      <S.PlayerImage src={soldier} alt={player.nickname} />
                      <S.PlayerInfo>
                        <S.PlayerRole>{mapTeamRoleToTranslation(player.role)}</S.PlayerRole>
                        <S.PlayerName>{player.nickname}</S.PlayerName>
                        <S.PlayerRealName>{realName}</S.PlayerRealName>
                      </S.PlayerInfo>
                    </S.PlayerCard>
                  );
                })}
              </Carousel>
            </>
          )}
        </S.CarouselDiv>
      </Card>
    </>
  );
};
