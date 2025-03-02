import React, { useMemo, useState } from 'react';

import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { compact } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { useRemoveUserFromTeam } from '../../../../../api/hooks/teams/api';
import { ITeamPlayers } from '../../../../../api/hooks/teams/interfaces';
import soldier from '../../../../../assets/teamDetail/soldier.webp';
import { Button } from '../../../../../components/Button/Button';
import { MainButtonVariant } from '../../../../../components/Button/enums';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchStatus, TeamMemberStatus, TeamRole } from '../../../../../constants/enums';
import { Routes } from '../../../../../routes/enums';
import { mapTeamRoleToTranslation } from '../../../../../utils/mappingLabelUtils';
import { SetUserRoleModalForm } from '../SetUserRoleModal/SetUserRoleModal.form';

import { messages } from './messages';

import * as S from './Players.style';

interface IPlayer {
  key: string;
  role: TeamRole;
  userId: string;
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
  currentUserId?: string;
  goToPlayerDetail: (id: string) => void;
  handleApproveRequest: (id: string) => void;
  handleRejectRequest: (id: string) => void;
  players: ITeamPlayers[];
  teamId: string;
  userIsOwner?: boolean;
  userIsAdmin?: boolean;
}

export const Players: React.FC<IProps> = (props: IProps) => {
  const {
    currentUserId,
    goToPlayerDetail,
    handleApproveRequest,
    handleRejectRequest,
    players,
    teamId,
    userIsOwner = false,
    userIsAdmin = false,
  } = props;
  const [modalProps, setModalProps] = useState<IModalProps>({ isOpen: false });

  const removePlayer = useRemoveUserFromTeam();

  const activeMembers = players.filter((item) => item.status === TeamMemberStatus.ACTIVE);
  const awaitingMembers = players.filter((item) => item.status === TeamMemberStatus.AWAITING);
  const removedMembers = players.filter((item) => item.status === TeamMemberStatus.REMOVED);

  const activePlayers: IPlayer[] =
    activeMembers?.map((item) => ({
      key: item.user.id,
      userInTeamId: item.id,
      userId: item.user.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const awaitingPlayers: IPlayer[] =
    awaitingMembers?.map((item) => ({
      key: item.user.id,
      userInTeamId: item.id,
      userId: item.user.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const removedPlayers: IPlayer[] =
    removedMembers?.map((item) => ({
      key: item.user.id,
      userInTeamId: item.id,
      userId: item.user.id,
      role: item.role,
      nickname: item.user.nickname,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    })) ?? [];

  const showAwaitingPlayers = awaitingMembers.length > 0 && (userIsOwner || userIsAdmin);
  const showRemovedPlayers = removedMembers.length > 0;

  const handleRemovePlayerFromTeam = async (userInTeamId: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    await removePlayer.mutateAsync({ teamId: teamId, userId: userInTeamId });
  };

  const handlePlayerRoleChange = (
    userInTeamId: string,
    nickname: string,
    role: TeamRole,
    event?: React.MouseEvent<HTMLElement>,
  ) => {
    event?.stopPropagation();
    setModalProps({ isOpen: true, userInTeamId, nickname, role });
  };

  const showRemovePlayerIcon = userIsAdmin || userIsOwner;

  return (
    <>
      <Card>
        <S.DesktopContainer>
          <h3 style={{ margin: 0 }}>
            <FormattedMessage {...messages.activePlayersTitle} />
          </h3>
          {activePlayers.map((player, index) => {
            const realName = compact([player.firstName, player.lastName]).join(' ');

            const playerItems: MenuProps['items'] = [
              {
                label: <FormattedMessage {...messages.changeRole} />,
                key: `player-${index}-0`,
                onClick: () => {},
              },
              {
                label: <FormattedMessage {...messages.deletePlayer} />,
                key: `player-${index}-1`,
                onClick: (event?: React.MouseEvent<HTMLElement>) =>
                  handleRemovePlayerFromTeam(player.userInTeamId, event),
                disabled: !showRemovePlayerIcon,
              },
            ];

            return (
              <S.PlayerCard key={index} onClick={() => goToPlayerDetail(player.key)}>
                <S.PlayerImage src={soldier} alt={`${player.nickname}`} />
                <S.PlayerInfo>
                  <S.PlayerRole>{mapTeamRoleToTranslation(player.role)}</S.PlayerRole>
                  <S.PlayerName>{player.nickname}</S.PlayerName>
                  <S.PlayerRealName>{realName}</S.PlayerRealName>
                </S.PlayerInfo>
                {player.role !== TeamRole.OWNER && userIsOwner && (
                  <Dropdown menu={{ items: playerItems }}>
                    <S.GearIcon
                      icon={<SettingOutlined />}
                      onClick={(event?: React.MouseEvent<HTMLElement>) => event?.stopPropagation()}
                    />
                  </Dropdown>
                )}
                {!userIsOwner && currentUserId === player.userId && (
                  <S.GearIcon
                    icon={<DeleteOutlined />}
                    onClick={(event?: React.MouseEvent<HTMLElement>) =>
                      handleRemovePlayerFromTeam(player.userInTeamId, event)
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
