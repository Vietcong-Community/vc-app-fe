import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import {
  useApproveJoinRequest,
  useHasAllowedToJoinTheTeam,
  useJoinTeam,
  useRejectJoinRequest,
  useTeamDetail,
  useTeamPlayers,
} from '../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Button } from '../../../components/Button/Button';
import { Divider } from '../../../components/Divider/Divider';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { ResourceNotFound } from '../../../components/ResourceNotFound/ResourceNotFound';
import { H1 } from '../../../components/Titles/H1/H1';
import { Role, TeamRole } from '../../../constants/enums';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { EditTeamModalForm } from './components/EditTeamModal/EditTeamModal.form';
import { Players } from './components/Players/Players';
import { RemovePlayerModal } from './components/RemovePlayerModal/RemovePlayerModal';
import { TeamInfo } from './components/TeamInfo/TeamInfo';
import { messages } from './messages';
import { isUserOnlyOwner } from './utils';

import * as S from '../TeamDetail/TeamDetail.style';

export const TeamDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState<boolean>(false);
  const [removePlayerModalIsOpen, setRemovePlayerModalIsOpen] = useState<boolean>(false);

  const team = useTeamDetail(query.id);
  const userMe = useUserMe(false, [401]);
  const joinTeam = useJoinTeam(query.id);
  const approveTeamJoin = useApproveJoinRequest(query.id);
  const rejectTeamJoin = useRejectJoinRequest(query.id);

  const teamPlayers = useTeamPlayers(query.id);
  const hasAllowedJoinTeam = useHasAllowedToJoinTheTeam(query.id, [401]);

  const userInCurrentTeam =
    !!userMe.data?.id && teamPlayers.data?.items.find((item) => item.user.id === userMe.data?.id);
  const userCanJoinTeam = !!hasAllowedJoinTeam.data?.hasAllowedToJoin;
  const userIsOwner =
    !!userMe.data?.id &&
    teamPlayers.data?.items.find((item) => item.user.id === userMe.data?.id)?.role === TeamRole.OWNER;
  const userCanLeaveTeam =
    !!userInCurrentTeam && (!userIsOwner || !isUserOnlyOwner(userMe.data?.id, teamPlayers?.data?.items ?? []));

  const handleLeaveTeam = async () => {
    if (!userMe.data?.id) {
      return;
    }

    setRemovePlayerModalIsOpen(true);
  };

  const handleJoinTeam = async () => {
    try {
      await joinTeam.mutateAsync();
      await teamPlayers.refetch();
      showNotification(messages.joinSuccess, messages.joinSuccessDescription, NotificationType.INFO);
    } catch {
      showNotification(messages.joinFailed, undefined, NotificationType.ERROR);
    }
  };

  const handleApproveJoinRequest = async (userId: string) => {
    try {
      await approveTeamJoin.mutateAsync({ userId });
      await teamPlayers.refetch();
      showNotification(messages.approveSuccess, undefined, NotificationType.INFO);
    } catch {
      showNotification(messages.approveFailed, undefined, NotificationType.ERROR);
    }
  };

  const handleRejectJoinRequest = async (userId: string) => {
    try {
      await rejectTeamJoin.mutateAsync({ userId });
      await teamPlayers.refetch();
      showNotification(messages.rejectSuccess, undefined, NotificationType.INFO);
    } catch {
      showNotification(messages.rejectFailed, undefined, NotificationType.ERROR);
    }
  };

  const goToPlayerDetail = (id: string) => navigate(Routes.USER_PROFILE.replace(':id', id));

  const showLoading = team.isLoading || userMe.isLoading || teamPlayers.isLoading;

  if (team.isError) {
    return (
      <ContentLayout>
        <ResourceNotFound name={formatMessage(messages.title)} />
      </ContentLayout>
    );
  }

  return (
    <>
      <ContentLayout breadcrumbItems={[{ key: 'bc-team', title: <FormattedMessage {...messages.title} /> }]}>
        <Helmet title={`${formatMessage(messages.title)}${team.data?.name ? ` - ${team.data?.name}` : ''}`} />
        {showLoading && (
          <>
            <Gap defaultHeight={32} height={{ md: 16 }} />
            <Spin size="large" />
          </>
        )}
        <EaseInOutContainer isOpen={!showLoading}>
          <Flex align="center" justify="space-between" style={{ gap: 16, textAlign: 'start' }}>
            <H1>{team.data?.name}</H1>
            <S.ManageButtons>
              {userIsOwner && (
                <S.AvatarIcon
                  shape="square"
                  size={32}
                  icon={<EditOutlined />}
                  onClick={() => setUpdateModalIsOpen(true)}
                />
              )}
              {userCanJoinTeam && (
                <Button onClick={handleJoinTeam} style={{ padding: '0.25rem 1rem' }}>
                  <DeleteOutlined />
                  <FormattedMessage {...messages.joinBtn} />
                </Button>
              )}
              {userCanLeaveTeam && (
                <Button onClick={handleLeaveTeam} style={{ padding: '0.25rem 1rem' }}>
                  <PlusOutlined />
                  <FormattedMessage {...messages.leaveTeamButton} />
                </Button>
              )}
            </S.ManageButtons>
          </Flex>
          <Divider />
          <Gap defaultHeight={16} />
          <S.Content>
            <S.TeamInfo>
              <TeamInfo teamDetail={team.data} showAvatarUploadOption={userIsOwner} />
            </S.TeamInfo>
            <S.Members>
              <Players
                currentUserId={userMe.data?.id}
                goToPlayerDetail={goToPlayerDetail}
                handleApproveRequest={handleApproveJoinRequest}
                handleRejectRequest={handleRejectJoinRequest}
                players={teamPlayers.data?.items ?? []}
                teamId={query.id}
                userIsOwner={userIsOwner}
                userIsAdmin={userMe.data?.roles?.includes(Role.ADMIN)}
              />
            </S.Members>
          </S.Content>
        </EaseInOutContainer>
        <Gap defaultHeight={32} height={{ md: 16 }} />
      </ContentLayout>
      <EditTeamModalForm
        isOpen={updateModalIsOpen}
        onClose={() => setUpdateModalIsOpen(false)}
        initialValues={{ name: team.data?.name, tag: team.data?.tag, description: team.data?.description }}
        teamId={query.id}
      />
      <RemovePlayerModal
        teamId={query.id}
        isOpen={removePlayerModalIsOpen}
        nickname={userMe.data?.nickname ?? ''}
        onClose={() => setRemovePlayerModalIsOpen(false)}
        userId={userMe.data?.id ?? ''}
      />
    </>
  );
};
