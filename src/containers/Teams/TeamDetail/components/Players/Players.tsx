import React, { useState } from 'react';

import { SettingOutlined } from '@ant-design/icons';
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
import { SetUserRoleModalForm } from '../SetUserRoleModal/SetUserRoleModal.form';

import { messages } from './messages';

import * as S from './Players.style';

interface IPlayer {
  key: string;
  role: TeamRole;
  userInTeamId: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
}

interface IModalProps {
  isOpen: boolean;
  nickname?: string;
  role?: string;
  userInTeamId?: string;
}

interface IProps {
  goToPlayerDetail: (id: string) => void;
  handleApproveRequest: (id: string) => void;
  handleRejectRequest: (id: string) => void;
  players: ITeamPlayers[];
  teamId: string;
  userIsOwner?: boolean;
}

export const Players: React.FC<IProps> = (props: IProps) => {
  const { goToPlayerDetail, handleApproveRequest, handleRejectRequest, players, teamId, userIsOwner = false } = props;
  const [modalProps, setModalProps] = useState<IModalProps>({ isOpen: false });

  const activeMembers = players.filter((item) => item.status === TeamMemberStatus.ACTIVE);
  const awaitingMembers = players.filter((item) => item.status === TeamMemberStatus.AWAITING);
  const removedMembers = players.filter((item) => item.status === TeamMemberStatus.REMOVED);

  const activePlayers: IPlayer[] =
    activeMembers?.map((item) => ({
      key: item.user.id,
      userInTeamId: item.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const awaitingPlayers: IPlayer[] =
    awaitingMembers?.map((item) => ({
      key: item.user.id,
      userInTeamId: item.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const removedPlayers: IPlayer[] =
    removedMembers?.map((item) => ({
      key: item.user.id,
      userInTeamId: item.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const showAwaitingPlayers = awaitingMembers.length > 0 && userIsOwner;
  const showRemovedPlayers = removedMembers.length > 0;

  const handlePlayerRoleChange = (
    userInTeamId: string,
    nickname: string,
    role: TeamRole,
    event?: React.MouseEvent<HTMLElement>,
  ) => {
    event?.stopPropagation();
    setModalProps({ isOpen: true, userInTeamId, nickname, role });
  };

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
                {player.role !== TeamRole.OWNER && userIsOwner && (
                  <S.GearIcon
                    icon={<SettingOutlined />}
                    onClick={(event?: React.MouseEvent<HTMLElement>) =>
                      handlePlayerRoleChange(player.userInTeamId, player.nickname, player.role, event)
                    }
                  />
                )}
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
      </Card>
      <SetUserRoleModalForm
        initialValues={{ role: modalProps.role as TeamRole }}
        isOpen={modalProps.isOpen}
        nickname={modalProps.nickname}
        onClose={() => setModalProps({ isOpen: false })}
        teamId={teamId}
        userInTeamId={modalProps.userInTeamId}
      />
    </>
  );
};
